-- M2B: products bento flag + extra product seeds
-- Run after 20260927000001_capabilities_bullets.sql

alter table m2b.projects
  add column if not exists show_in_bento boolean not null default false,
  add column if not exists bento_sort_order integer not null default 0,
  add column if not exists stack_line text not null default '',
  add column if not exists metric_label text not null default '';

create index if not exists projects_bento_idx
  on m2b.projects (show_in_bento, is_published, bento_sort_order);

-- Mark / insert Design Ref bento products
insert into m2b.projects (
  slug, title, tagline, description, category,
  client_name, year, cover_image_url, logo_url,
  mesh_preview, mesh_category, accent_color, stack_line, metric_label,
  is_featured, is_published, sort_order, show_in_hero, hero_sort_order,
  show_in_bento, bento_sort_order
)
values
  (
    'ekaadh',
    'Ekaadh Tickets',
    'Frictionless Horn of Africa event marketplace with ZAAD/eDahab instant checkout and cryptographically signed offline QR pass verification.',
    'Mobile ticketing with tiered tickets, mobile money, cryptographically signed QR passes, and offline gate scanners.',
    'mobile_app',
    'Event Organizers Collective',
    2025,
    '/projects/ekaadh-logo.png',
    '/projects/ekaadh-logo.png',
    'QR Gate 0.8s · Offline Auth · ZAAD Pass',
    'Mobile Ticketing',
    '#0B2F6B',
    'Flutter · Laravel · QR Crypto',
    'LIVE',
    true, true, 4, true, 4, true, 1
  ),
  (
    'suuqsade',
    'Suuqsade Global Proxy Engine',
    'Automated quote extraction for Amazon, Shein & AliExpress URLs into local Horn currency, calculating customs duties, air freight by weight, and ZAAD checkout.',
    'Cross-border proxy shopping engine for the Horn of Africa.',
    'mobile_app',
    'Suuqsade',
    2025,
    '/projects/suuqsade-logo.png',
    '/projects/suuqsade-logo.png',
    '12,000+ Packages Shipped',
    'Cross-Border Commerce',
    '#0B2F6B',
    'Flutter · Laravel API · Freight SMS',
    '12,000+ Packages Shipped',
    true, true, 6, false, 0, true, 2
  ),
  (
    'biloop',
    'Biloop Invoice',
    'Live A4 quotation-to-invoice engine with digital corporate rubber stamps, dual USD / SL Shillings, and direct WhatsApp invoice dispatch.',
    'SaaS invoicing for ministries and SMEs across Somaliland.',
    'web_app',
    'Biloop',
    2025,
    '/projects/biloop-logo.png',
    '/projects/biloop-logo.png',
    'Official Stamps',
    'SaaS Product',
    '#D4AF37',
    'Next.js · React-PDF · PostgreSQL',
    'Official Stamps',
    true, true, 7, false, 0, true, 3
  ),
  (
    'jimicso',
    'Jimicso',
    'Playful Somali community fitness companion with habit streaks, XP rewards, and weekly friends leaderboards in Hargeisa and London.',
    'Consumer fitness and community engagement for the Horn and diaspora.',
    'mobile_app',
    'Jimicso',
    2025,
    '/projects/jimicso.png',
    '/projects/jimicso-logo.png',
    'Level 18 · Hargeisa Friends Board · XP +450',
    'Mobile Health',
    '#D4AF37',
    'Flutter · Firebase · Community',
    '14k Streaks',
    true, true, 5, true, 5, true, 4
  ),
  (
    'kobneti',
    'KobNeti Support Hub',
    'Multi-tenant support desk bridging WhatsApp, live website chat, ticket queues, and telecom API uptime monitors.',
    'Enterprise ops support mesh for telecom and multi-tenant desks.',
    'web_app',
    'KobNeti',
    2025,
    '/projects/kobneti-logo.png',
    '/projects/kobneti-logo.png',
    'Mean Resolution Time: -52% vs manual',
    'Enterprise Ops',
    '#0B2F6B',
    'Node.js · WebSockets · Filament',
    'WebSocket Mesh',
    true, true, 8, false, 0, true, 5
  ),
  (
    'reer-sh-yoonis',
    'Reer Sh Yoonis Lineage',
    'Family genealogy archive, digital patronymic tree, care ratings, and transparent diaspora mutual-aid treasury.',
    'Heritage archive and mutual-aid treasury for the diaspora.',
    'web_app',
    'Reer Sh Yoonis',
    2025,
    '/projects/reer-sh-yoonis-logo.png',
    '/projects/reer-sh-yoonis-logo.png',
    'Verified Lineage: 1,850+ Family Members',
    'Heritage & Treasury',
    '#D4AF37',
    'Next.js · D3.js · PostgreSQL',
    '8 Generations',
    true, true, 9, false, 0, true, 6
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
  stack_line = excluded.stack_line,
  metric_label = excluded.metric_label,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  show_in_bento = excluded.show_in_bento,
  bento_sort_order = excluded.bento_sort_order,
  updated_at = now();
