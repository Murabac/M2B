-- M2B: site_settings, inquiry CRM fields, activity_log
-- Run after 20260927000007_contact_inquiries.sql

-- ---------------------------------------------------------------------------
-- contact_inquiries: CRM fields
-- ---------------------------------------------------------------------------

alter table m2b.contact_inquiries
  add column if not exists status text not null default 'new'
    check (status in ('new', 'reviewing', 'contacted', 'proposal_sent', 'won', 'archived'));

alter table m2b.contact_inquiries
  add column if not exists priority text not null default 'normal'
    check (priority in ('high', 'medium', 'normal'));

alter table m2b.contact_inquiries
  add column if not exists notes text not null default '';

create index if not exists contact_inquiries_status_idx
  on m2b.contact_inquiries (status, created_at desc);

drop policy if exists "Admins can update contact_inquiries" on m2b.contact_inquiries;
create policy "Admins can update contact_inquiries"
  on m2b.contact_inquiries
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

grant update on m2b.contact_inquiries to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- site_settings (singleton)
-- ---------------------------------------------------------------------------

create table if not exists m2b.site_settings (
  id integer primary key default 1 check (id = 1),
  studio_name text not null default 'M2B',
  company_legal_name text not null default 'M2B Technology Innovation Solutions',
  pillars text not null default 'Technology | Innovation | Solutions',
  tagline text not null default 'Connecting today, building tomorrow',
  founder_name text not null default 'Abdirahmaan Mire',
  founder_role text not null default 'Senior Software Developer & Project Manager',
  founder_bio text not null default '',
  founder_experience_years integer not null default 9,
  city text not null default 'Hargeisa',
  country text not null default 'Somaliland',
  office_address text not null default '',
  coordinates text not null default '09°33''42" N, 44°03''36" E',
  email text not null default 'hello@example.com',
  phone_primary text not null default '(252) 63-7744447',
  phone_secondary text not null default '',
  whatsapp text not null default '252637744447',
  business_hours_weekdays text not null default '08:00 – 17:00 EAT',
  business_hours_friday text not null default 'Closed for prayer',
  timezone text not null default 'Africa/Mogadishu (EAT · UTC+3)',
  stats_towers_inspected text not null default '120+',
  stats_listeners_count text not null default '10k+',
  stats_schools_managed text not null default '40+',
  stats_mobile_money_processed text not null default '$2M+',
  announcement_enabled boolean not null default false,
  announcement_text_en text not null default '',
  announcement_text_so text not null default '',
  announcement_action_en text not null default '',
  announcement_action_so text not null default '',
  announcement_action_url text not null default '/contact',
  announcement_tone text not null default 'gold'
    check (announcement_tone in ('gold', 'navy', 'emerald')),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_settings_set_updated_at on m2b.site_settings;
create trigger site_settings_set_updated_at
  before update on m2b.site_settings
  for each row execute function m2b.set_updated_at();

alter table m2b.site_settings enable row level security;

drop policy if exists "Public can read site_settings" on m2b.site_settings;
create policy "Public can read site_settings"
  on m2b.site_settings
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can update site_settings" on m2b.site_settings;
create policy "Admins can update site_settings"
  on m2b.site_settings
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can insert site_settings" on m2b.site_settings;
create policy "Admins can insert site_settings"
  on m2b.site_settings
  for insert
  to authenticated
  with check (m2b.is_admin());

grant select, insert, update on m2b.site_settings to anon, authenticated, service_role;

insert into m2b.site_settings (id)
values (1)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- activity_log
-- ---------------------------------------------------------------------------

create table if not exists m2b.activity_log (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'system'
    check (type in ('project', 'inquiry', 'system', 'setting')),
  message text not null,
  actor_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists activity_log_created_at_idx
  on m2b.activity_log (created_at desc);

alter table m2b.activity_log enable row level security;

drop policy if exists "Admins can read activity_log" on m2b.activity_log;
create policy "Admins can read activity_log"
  on m2b.activity_log
  for select
  to authenticated
  using (m2b.is_admin());

drop policy if exists "Admins can insert activity_log" on m2b.activity_log;
create policy "Admins can insert activity_log"
  on m2b.activity_log
  for insert
  to authenticated
  with check (m2b.is_admin());

grant select, insert on m2b.activity_log to authenticated, service_role;
