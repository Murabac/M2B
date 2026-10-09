-- M2B: case-study story fields (problem / approach / highlights)
-- Run after 20260927000016_cilmi_foundation_rebrand.sql

alter table m2b.projects
  add column if not exists problem text not null default '',
  add column if not exists approach text not null default '',
  add column if not exists highlights jsonb not null default '[]'::jsonb;

comment on column m2b.projects.problem is 'Case study: the challenge / why this product exists';
comment on column m2b.projects.approach is 'Case study: how the idea was shaped and built';
comment on column m2b.projects.highlights is 'Case study: 3–6 interesting shipped points (string array)';
