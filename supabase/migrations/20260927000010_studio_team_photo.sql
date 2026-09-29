-- M2B: team member photo URLs for CMS upload
-- Run after 20260927000009_studio_team.sql

alter table m2b.studio_team
  add column if not exists photo_url text;
