-- M2B: hero constellation — Ekaadh #2, ACU replaces Jimicso, Dugsi text logo
-- Run after 20260927000013_split_aragsan_dugsi.sql

-- Dugsi ERP uses a styled text wordmark (not the NOVA/Aragsan logo)
update m2b.projects
set
  logo_url = '/projects/dugsi-erp-logo.svg',
  cover_image_url = '/projects/dugsi-erp-logo.svg',
  show_in_hero = true,
  updated_at = now()
where slug = 'dugsi-erp';

-- Remove Jimicso from hero mesh
update m2b.projects
set
  show_in_hero = false,
  updated_at = now()
where slug = 'jimicso';

-- Promote ACU into the hero mesh
update m2b.projects
set
  show_in_hero = true,
  mesh_preview = coalesce(nullif(mesh_preview, ''), 'Admissions · Programs · CMS'),
  mesh_category = coalesce(nullif(mesh_category, ''), 'Higher Ed'),
  accent_color = coalesce(nullif(accent_color, ''), '#0A3A7A'),
  updated_at = now()
where slug = 'acu';

-- Ensure Ekaadh stays in the hero mesh
update m2b.projects
set
  show_in_hero = true,
  updated_at = now()
where slug = 'ekaadh';

-- Hero order: TowerLine, Ekaadh, Qaari, Aragsan, Dugsi ERP, ACU
update m2b.projects set hero_sort_order = 1, updated_at = now() where slug = 'towerline';
update m2b.projects set hero_sort_order = 2, updated_at = now() where slug = 'ekaadh';
update m2b.projects set hero_sort_order = 3, updated_at = now() where slug = 'qaari';
update m2b.projects set hero_sort_order = 4, updated_at = now() where slug = 'aragsan';
update m2b.projects set hero_sort_order = 5, updated_at = now() where slug = 'dugsi-erp';
update m2b.projects set hero_sort_order = 6, updated_at = now() where slug = 'acu';
