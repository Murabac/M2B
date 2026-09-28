-- M2B: work page fields (sector filters, status, outcome, stack chips)
-- Run after 20260927000003_project_logo_urls.sql

alter table m2b.projects
  add column if not exists work_category text not null default 'operations',
  add column if not exists sector text not null default '',
  add column if not exists status text not null default 'Live',
  add column if not exists outcome text not null default '',
  add column if not exists stack jsonb not null default '[]'::jsonb;

create index if not exists projects_work_category_idx
  on m2b.projects (work_category, is_published, sort_order);

-- Backfill known projects from Design Ref WorkView data
update m2b.projects set
  work_category = 'government',
  sector = 'Government Infrastructure',
  status = 'In Production',
  outcome = '1,400+ telecom masts audited, license approvals digitized, 100% field tablet offline sync.',
  stack = '["Laravel","Filament","PostGIS","Leaflet GIS","Flutter","Tailwind"]'::jsonb,
  updated_at = now()
where slug = 'towerline';

update m2b.projects set
  work_category = 'faith',
  sector = 'Faith & Media',
  status = 'Live',
  outcome = 'Over 85,000 monthly active listeners across the Horn of Africa and the global diaspora.',
  stack = '["Flutter","Laravel Filament","Cloudflare R2","Audio CDN","Next.js"]'::jsonb,
  updated_at = now()
where slug = 'qaari';

update m2b.projects set
  work_category = 'operations',
  sector = 'Operations & Facilities',
  status = 'Live',
  outcome = 'Automated 120+ client facilities with real-time audit scoring and zero payroll delays.',
  stack = '["Laravel","Filament v3","Livewire","MySQL","ZAAD API","eDahab API"]'::jsonb,
  updated_at = now()
where slug = 'aragsan-dugsi';

update m2b.projects set
  work_category = 'commerce',
  sector = 'Event Ticketing',
  status = 'Live',
  outcome = 'Processed over $140k in conference and festival registrations with zero fraudulent tickets.',
  stack = '["Flutter","Laravel","Telescope","QR Crypto","ZAAD Webhook"]'::jsonb,
  updated_at = now()
where slug = 'ekaadh';

update m2b.projects set
  work_category = 'mobile',
  sector = 'Community & Fitness',
  status = 'Live',
  outcome = 'Habit streaks and diaspora leaderboards engaging communities in Hargeisa and London.',
  stack = '["Flutter","Firebase","Community"]'::jsonb,
  updated_at = now()
where slug = 'jimicso';

update m2b.projects set
  work_category = 'commerce',
  sector = 'Cross-border Commerce',
  status = 'Live',
  outcome = 'Delivered over 12,000 international packages with full tracking transparency.',
  stack = '["Flutter Consumer App","Laravel API","Web Scraping Service","Cargo SMS"]'::jsonb,
  updated_at = now()
where slug = 'suuqsade';

update m2b.projects set
  work_category = 'operations',
  sector = 'SaaS & Billing',
  status = 'Studio Product',
  outcome = 'Adopted by 80+ regional businesses for fast quotation-to-invoice conversions.',
  stack = '["Next.js","React-PDF","Tailwind","PostgreSQL","Stripe & ZAAD"]'::jsonb,
  updated_at = now()
where slug = 'biloop';

update m2b.projects set
  work_category = 'operations',
  sector = 'Operations & Customer Ops',
  status = 'In Production',
  outcome = 'Reduced resolution time by 52% across regional telco reseller teams.',
  stack = '["Node.js","WebSockets","Laravel Filament","Redis"]'::jsonb,
  updated_at = now()
where slug = 'kobneti';

update m2b.projects set
  work_category = 'websites',
  sector = 'Heritage & Treasury',
  status = 'Live',
  outcome = 'Verified lineage archive supporting 1,850+ family members across Horn and diaspora.',
  stack = '["Next.js","D3.js","PostgreSQL"]'::jsonb,
  updated_at = now()
where slug = 'reer-sh-yoonis';

-- Default sector from mesh_category when still blank
update m2b.projects
set sector = mesh_category, updated_at = now()
where sector = '' and mesh_category <> '';
