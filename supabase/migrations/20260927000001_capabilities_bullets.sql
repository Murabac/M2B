-- M2B: capabilities band — bullets on services + Design Ref seed set
-- Run after 20260927000000_home_content.sql

alter table m2b.services
  add column if not exists bullets jsonb not null default '[]'::jsonb;

-- Retire the original 4 placeholder services (keep rows for history if referenced)
update m2b.services
set is_published = false, updated_at = now()
where slug in (
  'custom-software',
  'mobile-apps',
  'erp-systems',
  'websites-ecommerce'
);

insert into m2b.services (slug, title, description, icon, bullets, sort_order, is_published)
values
  (
    'business-systems',
    'Custom Business Systems & ERPs',
    'Deep operational consoles tailored to local commerce, payroll, inventory, and field workflows.',
    'layers',
    '["Dual-panel management consoles (Manager + Supervisor)","Saturday–Wednesday Horn of Africa operational calendars","Staff shift attendance & automated payroll deduction","Multi-tenant invoice generators with official seal stamping"]'::jsonb,
    1,
    true
  ),
  (
    'flutter-apps',
    'Flutter Apps (Consumer + Staff)',
    'Fluid cross-platform mobile apps for iOS and Android, built with offline-first persistence.',
    'smartphone',
    '["Consumer storefronts, media apps & community networks","Staff field-inspection and supervisory audit tools","Offline SQLite caching with automatic back-ground sync","Ultra-responsive touch targets (44px+) for low-spec Android devices"]'::jsonb,
    2,
    true
  ),
  (
    'gov-maps',
    'Government & Geospatial Maps',
    'Sovereign-grade registries, spatial asset mapping, and ministerial compliance workflows.',
    'map-pin',
    '["Interactive GIS layers for national infrastructure (MoCIT TowerLine)","Role-based security clearance & audit trails","Offline field GPS coordinate verification & photo proof","Bilingual executive reporting (English & Somali)"]'::jsonb,
    3,
    true
  ),
  (
    'commerce-mobile-money',
    'Commerce & Mobile Money',
    'Native integration with ZAAD, eDahab, and cross-border payment gateways in USD and SL Shillings.',
    'credit-card',
    '["Telesom ZAAD & Somtel eDahab direct merchant API checkout","Dual-currency display (USD & Somaliland Shilling rates)","QR event ticketing with signed offline gate scanning","Cross-border proxy checkout calculators (customs + air/sea freight)"]'::jsonb,
    4,
    true
  ),
  (
    'media-audio',
    'Media, Audio & Broadcast Pipelines',
    'Low-latency streaming architectures, synchronized typography, and resilient media CDNs.',
    'radio',
    '["Cloudflare R2 storage with edge-optimized streaming","Real-time ayah/verse audio synchronization (Qaari SL)","Background mobile playback with zero interruptions","Adaptive bitrate streaming optimized for 3G/4G cellular constraints"]'::jsonb,
    5,
    true
  ),
  (
    'delivery-leadership',
    'Delivery Leadership & Tech Advisory',
    'Senior software engineering leadership, technical specifications, and cross-border teams.',
    'shield-check',
    '["9+ years of production software craftsmanship led by Abdirahmaan Mire","Comprehensive system architecture & stakeholder alignment","Local-first resilience: network loss, low-spec hardware, multi-language","Long-term maintenance, security patching & staff onboarding"]'::jsonb,
    6,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  bullets = excluded.bullets,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();
