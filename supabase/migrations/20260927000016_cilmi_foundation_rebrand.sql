-- M2B: rename Reer Sh Yoonis → Cilmi Foundation + live family count + logo
-- Run after 20260927000015_xulka_quraada_rebrand.sql
-- Family member count sourced from reer_sh_yoonis.profiles (live: 328)

update m2b.projects
set
  title = 'Cilmi Foundation',
  tagline = 'Family genealogy archive, digital patronymic tree, care ratings, and transparent diaspora mutual-aid treasury.',
  description = 'Heritage archive and mutual-aid platform for the Cilmi Foundation lineage — family cards, multi-generational tree, care ratings, and diaspora contributions.',
  client_name = 'Cilmi Foundation',
  logo_url = '/projects/cilmi-foundation-logo.png',
  cover_image_url = '/projects/cilmi-foundation-logo.png',
  mesh_preview = 'Verified Lineage · 328 Family Members',
  mesh_category = 'Heritage & Treasury',
  metric_label = '328 Members',
  outcome = 'Verified lineage archive supporting 328 family members across Horn and diaspora.',
  metrics = '[
    {"label":"Family Members","value":"328"},
    {"label":"Generations","value":"8"}
  ]'::jsonb,
  updated_at = now()
where slug = 'reer-sh-yoonis';

update m2b.trust_sectors
set
  proof = 'Jimicso & Cilmi Foundation',
  updated_at = now()
where slug = 'community';
