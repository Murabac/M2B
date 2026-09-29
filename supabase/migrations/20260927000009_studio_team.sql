-- M2B: studio team members for /studio (CMS-editable)
-- Run after 20260927000008_admin_cms.sql

create table if not exists m2b.studio_team (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  initials text not null default '',
  name text not null,
  badge text not null default '',
  role text not null default '',
  bio text not null default '',
  skills jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists studio_team_published_sort_idx
  on m2b.studio_team (is_published, sort_order);

drop trigger if exists studio_team_set_updated_at on m2b.studio_team;
create trigger studio_team_set_updated_at
  before update on m2b.studio_team
  for each row execute function m2b.set_updated_at();

alter table m2b.studio_team enable row level security;

drop policy if exists "Public can read published studio_team" on m2b.studio_team;
create policy "Public can read published studio_team"
  on m2b.studio_team
  for select
  to anon, authenticated
  using (is_published = true or m2b.is_admin());

drop policy if exists "Admins can insert studio_team" on m2b.studio_team;
create policy "Admins can insert studio_team"
  on m2b.studio_team
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update studio_team" on m2b.studio_team;
create policy "Admins can update studio_team"
  on m2b.studio_team
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete studio_team" on m2b.studio_team;
create policy "Admins can delete studio_team"
  on m2b.studio_team
  for delete
  to authenticated
  using (m2b.is_admin());

grant select, insert, update, delete on m2b.studio_team to anon, authenticated, service_role;

insert into m2b.studio_team (slug, initials, name, badge, role, bio, skills, sort_order, is_published)
values
  (
    'abdirahmaan',
    'AM',
    'Abdirahmaan Mire',
    'Engineering',
    'Engineering & Delivery',
    'Senior software developer and project manager with 9+ years in production systems. Focuses on architecture, technical discovery, and delivery across government registries, education ERPs, and high-load consumer apps — offline-ready data models and local mobile money flows.',
    '["Software Architecture","Laravel & Filament","Flutter Systems","Technical Project Management"]'::jsonb,
    0,
    true
  ),
  (
    'mohamed',
    'MB',
    'Mohamed Bulbul',
    'Engineering',
    'Engineering & Delivery',
    'Senior software developer and project manager with the same engineering depth — architecture, full-stack delivery, and operational systems. Partners on every technical milestone from discovery through ship.',
    '["Software Architecture","Laravel & Filament","Flutter Systems","Technical Project Management"]'::jsonb,
    1,
    true
  ),
  (
    'adnan',
    'AB',
    'Adnan Bille',
    'Growth',
    'Marketing, Sales & Growth',
    'Heads marketing, sales, and everything non-technical — client relationships, positioning, partnerships, and go-to-market. Keeps the studio connected to ministries, enterprises, and the diaspora network.',
    '["Marketing & Brand","Sales & Partnerships","Client Relations","Business Development"]'::jsonb,
    2,
    true
  )
on conflict (slug) do nothing;
