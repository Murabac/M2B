-- M2B: contact inquiry form submissions for /contact
-- Run after 20260927000006_capability_pillars.sql

create table if not exists m2b.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  project_type text not null,
  estimated_amount_usd numeric(12, 2) not null check (estimated_amount_usd > 0),
  full_name text not null,
  email text not null,
  organization text not null default '',
  phone text not null,
  project_brief text not null default '',
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

create index if not exists contact_inquiries_created_at_idx
  on m2b.contact_inquiries (created_at desc);

alter table m2b.contact_inquiries enable row level security;

-- Public can submit inquiries; cannot read them back.
drop policy if exists "Public can insert contact_inquiries" on m2b.contact_inquiries;
create policy "Public can insert contact_inquiries"
  on m2b.contact_inquiries
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read contact_inquiries" on m2b.contact_inquiries;
create policy "Admins can read contact_inquiries"
  on m2b.contact_inquiries
  for select
  to authenticated
  using (m2b.is_admin());

drop policy if exists "Admins can delete contact_inquiries" on m2b.contact_inquiries;
create policy "Admins can delete contact_inquiries"
  on m2b.contact_inquiries
  for delete
  to authenticated
  using (m2b.is_admin());

grant select, insert, delete on m2b.contact_inquiries to anon, authenticated, service_role;
