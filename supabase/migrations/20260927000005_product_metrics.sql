-- M2B: product metrics for Products OS page
-- Run after 20260927000004_work_page_fields.sql

alter table m2b.projects
  add column if not exists metrics jsonb not null default '[]'::jsonb;

update m2b.projects set
  metrics = '[{"label":"Towers Registered","value":"1,420+"},{"label":"Coverage Visibility","value":"6 Regions"}]'::jsonb,
  updated_at = now()
where slug = 'towerline';

update m2b.projects set
  metrics = '[{"label":"Monthly Listeners","value":"85k+"},{"label":"Reciters Catalog","value":"140+ Shuyuukh"}]'::jsonb,
  updated_at = now()
where slug = 'qaari';

update m2b.projects set
  metrics = '[{"label":"Managed Sites","value":"120+"},{"label":"Audit Accuracy","value":"99.4%"}]'::jsonb,
  updated_at = now()
where slug = 'aragsan-dugsi';

update m2b.projects set
  metrics = '[{"label":"Tickets Issued","value":"24k+"},{"label":"Gate Scan Speed","value":"0.8s"}]'::jsonb,
  updated_at = now()
where slug = 'ekaadh';

update m2b.projects set
  metrics = '[{"label":"Packages Shipped","value":"12,000+"},{"label":"Tracking","value":"Full"}]'::jsonb,
  updated_at = now()
where slug = 'suuqsade';

update m2b.projects set
  metrics = '[{"label":"Businesses","value":"80+"},{"label":"Currencies","value":"USD + SLSH"}]'::jsonb,
  updated_at = now()
where slug = 'biloop';

update m2b.projects set
  metrics = '[{"label":"Resolution Time","value":"-52%"},{"label":"Channels","value":"Multi"}]'::jsonb,
  updated_at = now()
where slug = 'kobneti';

update m2b.projects set
  metrics = '[{"label":"Streaks","value":"14k"},{"label":"XP Boost","value":"+450"}]'::jsonb,
  updated_at = now()
where slug = 'jimicso';

update m2b.projects set
  metrics = '[{"label":"Family Members","value":"1,850+"},{"label":"Generations","value":"8"}]'::jsonb,
  updated_at = now()
where slug = 'reer-sh-yoonis';
