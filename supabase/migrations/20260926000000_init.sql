-- M2B Wave 3: dedicated `m2b` schema (safe for multi-schema Supabase projects)

create extension if not exists "pgcrypto";

create schema if not exists m2b;

grant usage on schema m2b to postgres, anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

do $$
begin
  create type m2b.project_category as enum (
    'web_app',
    'mobile_app',
    'erp',
    'website_ecommerce'
  );
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists m2b.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists m2b.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  icon text not null default 'code',
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists m2b.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text not null default '',
  description text not null default '',
  category m2b.project_category not null,
  client_name text,
  year integer,
  live_url text,
  app_store_url text,
  play_store_url text,
  cover_image_url text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists m2b.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references m2b.projects (id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists m2b.testimonials (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references m2b.projects (id) on delete cascade,
  author_name text not null,
  author_role text not null default '',
  quote text not null,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists services_published_sort_idx
  on m2b.services (is_published, sort_order);

create index if not exists projects_published_sort_idx
  on m2b.projects (is_published, sort_order);

create index if not exists projects_featured_idx
  on m2b.projects (is_featured, is_published, sort_order);

create index if not exists projects_category_idx
  on m2b.projects (category);

create index if not exists project_images_project_sort_idx
  on m2b.project_images (project_id, sort_order);

create index if not exists testimonials_project_sort_idx
  on m2b.testimonials (project_id, sort_order);

grant select, insert, update, delete on all tables in schema m2b to anon, authenticated, service_role;
grant usage, select on all sequences in schema m2b to anon, authenticated, service_role;
alter default privileges in schema m2b
  grant select, insert, update, delete on tables to anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function m2b.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists services_set_updated_at on m2b.services;
create trigger services_set_updated_at
  before update on m2b.services
  for each row execute function m2b.set_updated_at();

drop trigger if exists projects_set_updated_at on m2b.projects;
create trigger projects_set_updated_at
  before update on m2b.projects
  for each row execute function m2b.set_updated_at();

-- ---------------------------------------------------------------------------
-- Admin helper (SECURITY DEFINER so RLS can call it safely)
-- ---------------------------------------------------------------------------

create or replace function m2b.is_admin()
returns boolean
language sql
stable
security definer
set search_path = m2b, public
as $$
  select exists (
    select 1
    from m2b.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function m2b.is_admin() from public;
grant execute on function m2b.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table m2b.admin_users enable row level security;
alter table m2b.services enable row level security;
alter table m2b.projects enable row level security;
alter table m2b.project_images enable row level security;
alter table m2b.testimonials enable row level security;

drop policy if exists "Admins can read admin_users" on m2b.admin_users;
create policy "Admins can read admin_users"
  on m2b.admin_users
  for select
  to authenticated
  using (m2b.is_admin());

drop policy if exists "Public can read published services" on m2b.services;
create policy "Public can read published services"
  on m2b.services
  for select
  to anon, authenticated
  using (is_published = true or m2b.is_admin());

drop policy if exists "Admins can insert services" on m2b.services;
create policy "Admins can insert services"
  on m2b.services
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update services" on m2b.services;
create policy "Admins can update services"
  on m2b.services
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete services" on m2b.services;
create policy "Admins can delete services"
  on m2b.services
  for delete
  to authenticated
  using (m2b.is_admin());

drop policy if exists "Public can read published projects" on m2b.projects;
create policy "Public can read published projects"
  on m2b.projects
  for select
  to anon, authenticated
  using (is_published = true or m2b.is_admin());

drop policy if exists "Admins can insert projects" on m2b.projects;
create policy "Admins can insert projects"
  on m2b.projects
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update projects" on m2b.projects;
create policy "Admins can update projects"
  on m2b.projects
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete projects" on m2b.projects;
create policy "Admins can delete projects"
  on m2b.projects
  for delete
  to authenticated
  using (m2b.is_admin());

drop policy if exists "Public can read images of published projects" on m2b.project_images;
create policy "Public can read images of published projects"
  on m2b.project_images
  for select
  to anon, authenticated
  using (
    m2b.is_admin()
    or exists (
      select 1
      from m2b.projects p
      where p.id = project_id
        and p.is_published = true
    )
  );

drop policy if exists "Admins can insert project_images" on m2b.project_images;
create policy "Admins can insert project_images"
  on m2b.project_images
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update project_images" on m2b.project_images;
create policy "Admins can update project_images"
  on m2b.project_images
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete project_images" on m2b.project_images;
create policy "Admins can delete project_images"
  on m2b.project_images
  for delete
  to authenticated
  using (m2b.is_admin());

drop policy if exists "Public can read published testimonials" on m2b.testimonials;
create policy "Public can read published testimonials"
  on m2b.testimonials
  for select
  to anon, authenticated
  using (is_published = true or m2b.is_admin());

drop policy if exists "Admins can insert testimonials" on m2b.testimonials;
create policy "Admins can insert testimonials"
  on m2b.testimonials
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update testimonials" on m2b.testimonials;
create policy "Admins can update testimonials"
  on m2b.testimonials
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete testimonials" on m2b.testimonials;
create policy "Admins can delete testimonials"
  on m2b.testimonials
  for delete
  to authenticated
  using (m2b.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: m2b-project-images (public read, admin write)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'm2b-project-images',
  'm2b-project-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "M2B public can read project images" on storage.objects;
create policy "M2B public can read project images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'm2b-project-images');

drop policy if exists "M2B admins can upload project images" on storage.objects;
create policy "M2B admins can upload project images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'm2b-project-images' and m2b.is_admin());

drop policy if exists "M2B admins can update project images" on storage.objects;
create policy "M2B admins can update project images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'm2b-project-images' and m2b.is_admin())
  with check (bucket_id = 'm2b-project-images' and m2b.is_admin());

drop policy if exists "M2B admins can delete project images" on storage.objects;
create policy "M2B admins can delete project images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'm2b-project-images' and m2b.is_admin());

-- ---------------------------------------------------------------------------
-- Seed: 4 services (CMS content is English only)
-- ---------------------------------------------------------------------------

insert into m2b.services (slug, title, description, icon, sort_order, is_published)
values
  (
    'custom-software',
    'Custom software / web apps',
    'Bespoke web applications and business systems tailored to how your team works.',
    'code',
    1,
    true
  ),
  (
    'mobile-apps',
    'Mobile apps',
    'Native and cross-platform mobile apps for iOS and Android.',
    'smartphone',
    2,
    true
  ),
  (
    'erp-systems',
    'ERP systems',
    'Custom ERP and operations platforms — not Odoo. Built around your processes.',
    'building',
    3,
    true
  ),
  (
    'websites-ecommerce',
    'Websites and e-commerce',
    'Marketing sites and online stores that look sharp and convert.',
    'globe',
    4,
    true
  )
on conflict (slug) do nothing;
