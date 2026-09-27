-- M2B: dynamic home content (hero mesh, trust sectors, process steps)
-- Run in SQL Editor after 20260926000000_init.sql

-- ---------------------------------------------------------------------------
-- Extend projects for hero constellation
-- ---------------------------------------------------------------------------

alter table m2b.projects
  add column if not exists logo_url text,
  add column if not exists mesh_preview text not null default '',
  add column if not exists mesh_category text not null default '',
  add column if not exists accent_color text not null default '#0B2F6B',
  add column if not exists show_in_hero boolean not null default false,
  add column if not exists hero_sort_order integer not null default 0;

create index if not exists projects_hero_idx
  on m2b.projects (show_in_hero, is_published, hero_sort_order);

-- ---------------------------------------------------------------------------
-- Trust sectors
-- ---------------------------------------------------------------------------

create table if not exists m2b.trust_sectors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  proof text not null default '',
  metric text not null default '',
  icon text not null default 'landmark',
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists trust_sectors_published_sort_idx
  on m2b.trust_sectors (is_published, sort_order);

drop trigger if exists trust_sectors_set_updated_at on m2b.trust_sectors;
create trigger trust_sectors_set_updated_at
  before update on m2b.trust_sectors
  for each row execute function m2b.set_updated_at();

alter table m2b.trust_sectors enable row level security;

drop policy if exists "Public can read published trust_sectors" on m2b.trust_sectors;
create policy "Public can read published trust_sectors"
  on m2b.trust_sectors
  for select
  to anon, authenticated
  using (is_published = true or m2b.is_admin());

drop policy if exists "Admins can insert trust_sectors" on m2b.trust_sectors;
create policy "Admins can insert trust_sectors"
  on m2b.trust_sectors
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update trust_sectors" on m2b.trust_sectors;
create policy "Admins can update trust_sectors"
  on m2b.trust_sectors
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete trust_sectors" on m2b.trust_sectors;
create policy "Admins can delete trust_sectors"
  on m2b.trust_sectors
  for delete
  to authenticated
  using (m2b.is_admin());

-- ---------------------------------------------------------------------------
-- Process steps (How we ship)
-- ---------------------------------------------------------------------------

create table if not exists m2b.process_steps (
  id uuid primary key default gen_random_uuid(),
  step_key text not null unique,
  title text not null,
  description text not null default '',
  deliverables jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists process_steps_published_sort_idx
  on m2b.process_steps (is_published, sort_order);

drop trigger if exists process_steps_set_updated_at on m2b.process_steps;
create trigger process_steps_set_updated_at
  before update on m2b.process_steps
  for each row execute function m2b.set_updated_at();

alter table m2b.process_steps enable row level security;

drop policy if exists "Public can read published process_steps" on m2b.process_steps;
create policy "Public can read published process_steps"
  on m2b.process_steps
  for select
  to anon, authenticated
  using (is_published = true or m2b.is_admin());

drop policy if exists "Admins can insert process_steps" on m2b.process_steps;
create policy "Admins can insert process_steps"
  on m2b.process_steps
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update process_steps" on m2b.process_steps;
create policy "Admins can update process_steps"
  on m2b.process_steps
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete process_steps" on m2b.process_steps;
create policy "Admins can delete process_steps"
  on m2b.process_steps
  for delete
  to authenticated
  using (m2b.is_admin());

grant select, insert, update, delete on m2b.trust_sectors to anon, authenticated, service_role;
grant select, insert, update, delete on m2b.process_steps to anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Seed: flagship projects (hero mesh + featured + portfolio)
-- Logos served from Next.js public/projects until uploaded to storage.
-- ---------------------------------------------------------------------------

insert into m2b.projects (
  slug, title, tagline, description, category, client_name, year,
  cover_image_url, logo_url, mesh_preview, mesh_category, accent_color,
  is_featured, is_published, sort_order, show_in_hero, hero_sort_order
)
values
  (
    'towerline',
    'TowerLine GIS',
    'National telecom & broadcast infrastructure registry with interactive GIS coverage.',
    'A sovereign geospatial registry and field compliance platform managing telecom masts, TV/cable transmitters, and spectrum licenses across Somaliland regions.',
    'web_app',
    'MoCIT Somaliland',
    2025,
    '/projects/towerline.jpg',
    '/projects/towerline.jpg',
    'Tower #1420 · 6 Regions · Spectrum Active',
    'Gov Registry',
    '#0B2F6B',
    true, true, 1, true, 1
  ),
  (
    'qaari',
    'Qaari SL Audio',
    'Somali Quran reciters streaming platform with synchronized verse audio.',
    'Web and Flutter apps for consumers and studio reciters with follow-along Arabic typography, playlists, and offline audio pipelines.',
    'mobile_app',
    'Qaari Media',
    2025,
    '/projects/qaari.png',
    '/projects/qaari.svg',
    'Surah Al-Mulk · Ayah 14 Sync · 3G Edge',
    'Sacred Audio',
    '#D4AF37',
    true, true, 2, true, 2
  ),
  (
    'aragsan-dugsi',
    'NOVA / Dugsi ERP',
    'Facility operations and school ERP engineered for Horn of Africa calendars.',
    'Dual-panel facility management with supervisor checklists and ZAAD/eDahab billing, plus Form 1–4 school management with attendance and dual report cards.',
    'erp',
    'NOVA Cleaning / Academies Network',
    2025,
    '/projects/aragsan-full.png',
    '/projects/aragsan-full.png',
    'Form 1-4 · 99.4% Audit Ring · ZAAD Auto',
    'Daily Ops',
    '#0A3A7A',
    true, true, 3, true, 3
  ),
  (
    'ekaadh',
    'Ekaadh Ticketing',
    'Horn of Africa event marketplace with ZAAD/eDahab checkout and offline QR gates.',
    'Mobile ticketing with tiered tickets, mobile money, cryptographically signed QR passes, and offline gate scanners.',
    'mobile_app',
    'Event Organizers Collective',
    2025,
    '/projects/ekaadh-logo.png',
    '/projects/ekaadh-logo.png',
    'QR Gate 0.8s · Offline Auth · ZAAD Pass',
    'Mobile Money',
    '#0B2F6B',
    true, true, 4, true, 4
  ),
  (
    'jimicso',
    'Jimicso Community',
    'Somali fitness community app with streaks, friends boards, and XP.',
    'Consumer fitness and community engagement for the Horn and diaspora.',
    'mobile_app',
    'Jimicso',
    2025,
    '/projects/jimicso-logo.png',
    '/projects/jimicso-logo.png',
    'Level 18 · Hargeisa Friends Board · XP +450',
    'Somali Fitness',
    '#D4AF37',
    true, true, 5, true, 5
  )
on conflict (slug) do update set
  title = excluded.title,
  tagline = excluded.tagline,
  description = excluded.description,
  category = excluded.category,
  client_name = excluded.client_name,
  year = excluded.year,
  cover_image_url = excluded.cover_image_url,
  logo_url = excluded.logo_url,
  mesh_preview = excluded.mesh_preview,
  mesh_category = excluded.mesh_category,
  accent_color = excluded.accent_color,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  show_in_hero = excluded.show_in_hero,
  hero_sort_order = excluded.hero_sort_order,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Seed: trust sectors
-- ---------------------------------------------------------------------------

insert into m2b.trust_sectors (slug, name, proof, metric, icon, sort_order, is_published)
values
  ('government', 'Government', 'MoCIT TowerLine GIS', 'National Registry', 'landmark', 1, true),
  ('education', 'Education', 'Dugsi ERP & ACU Portal', '6,200+ Students', 'graduation-cap', 2, true),
  ('health', 'Health & NGO', 'ACFH & Liby Foundation', '40 Health Posts', 'heart-pulse', 3, true),
  ('commerce', 'Commerce & Ops', 'NOVA Cleaning & Ekaadh', '120+ Facilities', 'shopping-bag', 4, true),
  ('media', 'Media & Culture', 'Qaari SL & Maqal', '85k+ Monthly Streams', 'radio', 5, true),
  ('community', 'Community & Lineage', 'Jimicso & Reer Sh Yoonis', 'Horn & Diaspora', 'users', 6, true)
on conflict (slug) do update set
  name = excluded.name,
  proof = excluded.proof,
  metric = excluded.metric,
  icon = excluded.icon,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Seed: process steps
-- ---------------------------------------------------------------------------

insert into m2b.process_steps (step_key, title, description, deliverables, sort_order, is_published)
values
  (
    '01',
    'Discover & Map',
    'We audit your real-world operational bottlenecks: field paper trails, payment reconciliation issues, and stakeholder constraints across Hargeisa and beyond.',
    '["System Architecture Blueprint","Data & Entity Schema","Local Constraints Audit"]'::jsonb,
    1,
    true
  ),
  (
    '02',
    'Design & Prototype',
    'We craft high-density, ergonomic UIs with instant feedback. Every screen is designed for high sun visibility, bilingual typography, and 44px+ touch targets.',
    '["Figma Design System","Bilingual Microcopy","Interactive Prototypes"]'::jsonb,
    2,
    true
  ),
  (
    '03',
    'Engineer & Integrate',
    'We build with modern frameworks (Laravel, Filament, Flutter, .NET, Next.js). We wire direct local APIs for ZAAD, eDahab, GIS maps, and offline caches.',
    '["Production Codebase","Local Payment Webhooks","Automated Testing"]'::jsonb,
    3,
    true
  ),
  (
    '04',
    'Launch & Field-Test',
    'We test with actual field supervisors, remote teachers, or public users under poor 3G connections. We tune query performance to sub-100ms.',
    '["Production Deployment","Data Migration","Staff Hands-on Training"]'::jsonb,
    4,
    true
  ),
  (
    '05',
    'Operate & Scale',
    'Software is a living asset. We monitor infrastructure health, handle ministerial compliance updates, patch security, and expand feature modules.',
    '["Uptime SLA Monitoring","Security Patches","Feature Roadmaps"]'::jsonb,
    5,
    true
  )
on conflict (step_key) do update set
  title = excluded.title,
  description = excluded.description,
  deliverables = excluded.deliverables,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();
