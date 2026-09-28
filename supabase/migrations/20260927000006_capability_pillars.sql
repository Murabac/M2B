-- M2B: capability pillars for /services (Engineer / Operate / Lead)
-- Run after 20260927000005_product_metrics.sql

create table if not exists m2b.capability_pillars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text not null default '',
  icon text not null default 'code-2',
  technologies jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists capability_pillars_published_sort_idx
  on m2b.capability_pillars (is_published, sort_order);

drop trigger if exists capability_pillars_set_updated_at on m2b.capability_pillars;
create trigger capability_pillars_set_updated_at
  before update on m2b.capability_pillars
  for each row execute function m2b.set_updated_at();

alter table m2b.capability_pillars enable row level security;

drop policy if exists "Public can read published capability_pillars" on m2b.capability_pillars;
create policy "Public can read published capability_pillars"
  on m2b.capability_pillars
  for select
  to anon, authenticated
  using (is_published = true or m2b.is_admin());

drop policy if exists "Admins can insert capability_pillars" on m2b.capability_pillars;
create policy "Admins can insert capability_pillars"
  on m2b.capability_pillars
  for insert
  to authenticated
  with check (m2b.is_admin());

drop policy if exists "Admins can update capability_pillars" on m2b.capability_pillars;
create policy "Admins can update capability_pillars"
  on m2b.capability_pillars
  for update
  to authenticated
  using (m2b.is_admin())
  with check (m2b.is_admin());

drop policy if exists "Admins can delete capability_pillars" on m2b.capability_pillars;
create policy "Admins can delete capability_pillars"
  on m2b.capability_pillars
  for delete
  to authenticated
  using (m2b.is_admin());

insert into m2b.capability_pillars (slug, title, tagline, icon, technologies, sort_order, is_published)
values
  (
    'engineer',
    'Engineer',
    'High-durability codebases designed for variable networks and high data volume.',
    'code-2',
    '[
      {"name":"Laravel & Filament v3","desc":"Enterprise administration panels, dual manager/supervisor gates, automated jobs."},
      {"name":"Flutter 3.x","desc":"High-performance consumer and staff field mobile apps with offline SQLite caches."},
      {"name":".NET 8 / C#","desc":"Low-latency commercial commerce APIs and affiliate settlement engines."},
      {"name":"Next.js & TypeScript","desc":"Fast server-rendered portals, student systems, and high-conversion storefronts."},
      {"name":"GIS & Mapping (PostGIS)","desc":"Sovereign telecom tower registries, radius buffers, and regional boundary layers."},
      {"name":"Audio Streaming (Cloudflare R2)","desc":"Sub-250ms verse-synced audio playback pipelines across 3G networks."},
      {"name":"Cryptographic QR Gates","desc":"Fraud-proof signed event passes with sub-second offline gate scanners."},
      {"name":"Direct Mobile Money APIs","desc":"Telesom ZAAD and Somtel eDahab instant checkout webhooks & ledgers."}
    ]'::jsonb,
    1,
    true
  ),
  (
    'operate',
    'Operate',
    'Ergonomic consoles, field worker apps, and ministerial compliance workflows.',
    'settings-2',
    '[
      {"name":"Bilingual & RTL Ergonomics","desc":"Tailored typography for longer Somali phrasing, Uthmani Arabic script, and English."},
      {"name":"Field-Ready Offline UIs","desc":"High sunlight contrast, 44px+ touch targets, and caching for remote desert inspection."},
      {"name":"Role-Based Access Control","desc":"Granular permissions from ministerial executives to regional inspectors and school deans."},
      {"name":"Staff Audits & Photo Proof","desc":"Live GPS geostamping and mandatory photo upload trails before checklist clearance."},
      {"name":"SMS Gateway Broadcasts","desc":"Automated 10-minute parent attendance alerts and delivery notices."},
      {"name":"Dual Currency Ledger","desc":"Seamless automated conversion between USD and Somaliland Shilling daily market rates."}
    ]'::jsonb,
    2,
    true
  ),
  (
    'lead',
    'Lead',
    'Senior software engineering leadership with 9+ years of proven delivery in the Horn.',
    'users',
    '[
      {"name":"System Discovery & Scoping","desc":"Uncovering unwritten field bottlenecks before writing a single line of production code."},
      {"name":"Stakeholder Alignment","desc":"Translating ministerial policies, academic calendars, and business rules into architecture."},
      {"name":"Remote & Cross-Border Delivery","desc":"Leading blended technical squads connecting Hargeisa talent with international diaspora."},
      {"name":"Production SLAs & Security","desc":"Continuous patch management, uptime audits, and disaster recovery replication."},
      {"name":"Staff Enablement","desc":"Hands-on training for non-technical field supervisors, teachers, and ministry officers."}
    ]'::jsonb,
    3,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  tagline = excluded.tagline,
  icon = excluded.icon,
  technologies = excluded.technologies,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();
