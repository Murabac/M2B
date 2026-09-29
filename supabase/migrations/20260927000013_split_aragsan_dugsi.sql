-- M2B: split combined Aragsan/NOVA + Dugsi into two projects
-- Run after 20260927000012_murabac_portfolio_projects.sql

-- 1) Existing combined row → Aragsan / NOVA Ops only
update m2b.projects
set
  slug = 'aragsan',
  title = 'Aragsan / NOVA Ops',
  tagline = 'Facility management, supervisor checklists, and ZAAD/eDahab billing.',
  description = 'Enterprise operations console with live building health rings (green/amber/red), mobile supervisor audits, photo proof uploads, contracts, and instant mobile money reconciliation.',
  category = 'erp',
  work_category = 'operations',
  sector = 'Operations & Facilities',
  status = 'Live',
  outcome = 'Automated 120+ client facilities with real-time audit scoring and zero payroll delays.',
  stack = '["Laravel","Filament v3","Livewire","MySQL","ZAAD API","eDahab API"]'::jsonb,
  metrics = '[
    {"label":"Managed Sites","value":"120+"},
    {"label":"Daily Audits","value":"450+"},
    {"label":"Audit Accuracy","value":"99.4%"}
  ]'::jsonb,
  client_name = 'NOVA Cleaning Services',
  live_url = 'https://novacleaning.net',
  mesh_preview = '120+ Sites · Health Rings · ZAAD Auto',
  mesh_category = 'Facility Ops',
  accent_color = '#0A3A7A',
  stack_line = 'Laravel · Filament · ZAAD / eDahab',
  updated_at = now()
where slug = 'aragsan-dugsi';

-- If already renamed somehow, still refresh aragsan content
update m2b.projects
set
  title = 'Aragsan / NOVA Ops',
  tagline = 'Facility management, supervisor checklists, and ZAAD/eDahab billing.',
  description = 'Enterprise operations console with live building health rings (green/amber/red), mobile supervisor audits, photo proof uploads, contracts, and instant mobile money reconciliation.',
  category = 'erp',
  work_category = 'operations',
  sector = 'Operations & Facilities',
  status = 'Live',
  outcome = 'Automated 120+ client facilities with real-time audit scoring and zero payroll delays.',
  stack = '["Laravel","Filament v3","Livewire","MySQL","ZAAD API","eDahab API"]'::jsonb,
  client_name = 'NOVA Cleaning Services',
  live_url = coalesce(live_url, 'https://novacleaning.net'),
  mesh_category = 'Facility Ops',
  updated_at = now()
where slug = 'aragsan';

-- 2) New Dugsi ERP project
insert into m2b.projects (
  slug, title, tagline, description, category, work_category, sector, status, outcome,
  stack, metrics, client_name, year, cover_image_url, logo_url,
  mesh_preview, mesh_category, accent_color, stack_line,
  is_featured, is_published, sort_order, show_in_hero, hero_sort_order, show_in_bento, bento_sort_order
)
values (
  'dugsi-erp',
  'Dugsi ERP',
  'Form 1–4 classes-first school management for regional academic calendars.',
  'Institutional ERP for Saturday–Wednesday school weeks, parent SMS attendance alerts, Somali/English dual report cards, fee schedules, and staff payroll.',
  'erp',
  'education',
  'Education Management',
  'In Production',
  'Reduced term grade compilation from 2 weeks to 15 minutes across 8 institutions.',
  '["Laravel","Filament","Tailwind","SMS Gateway","PostgreSQL"]'::jsonb,
  '[
    {"label":"Active Students","value":"6,200+"},
    {"label":"SMS Notifications","value":"180k+"},
    {"label":"Term Processing","value":"15 Mins"}
  ]'::jsonb,
  'Secondary Academies Network',
  2025,
  '/projects/aragsan-full.png',
  '/projects/aragsan-logo.png',
  'Form 1–4 · SMS Parents · Dual Cards',
  'School ERP',
  '#0B2F6B',
  'Laravel · Filament · SMS',
  true,
  true,
  3,
  true,
  3,
  true,
  3
)
on conflict (slug) do update set
  title = excluded.title,
  tagline = excluded.tagline,
  description = excluded.description,
  category = excluded.category,
  work_category = excluded.work_category,
  sector = excluded.sector,
  status = excluded.status,
  outcome = excluded.outcome,
  stack = excluded.stack,
  metrics = excluded.metrics,
  client_name = excluded.client_name,
  cover_image_url = excluded.cover_image_url,
  logo_url = excluded.logo_url,
  mesh_preview = excluded.mesh_preview,
  mesh_category = excluded.mesh_category,
  accent_color = excluded.accent_color,
  stack_line = excluded.stack_line,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  show_in_hero = excluded.show_in_hero,
  show_in_bento = excluded.show_in_bento,
  updated_at = now();

-- Keep Aragsan featured in hero; Dugsi also featured (sort after Aragsan)
update m2b.projects
set
  is_featured = true,
  show_in_hero = true,
  hero_sort_order = 3,
  show_in_bento = true,
  bento_sort_order = 3,
  sort_order = 3,
  updated_at = now()
where slug = 'aragsan';

update m2b.projects
set
  hero_sort_order = 4,
  bento_sort_order = 4,
  sort_order = 4,
  updated_at = now()
where slug = 'dugsi-erp';
