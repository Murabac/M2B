-- M2B: worldwide positioning — clear Hargeisa HQ defaults from site_settings
-- Run after 20260927000010_studio_team_photo.sql

update m2b.site_settings
set
  city = 'Worldwide',
  country = '',
  coordinates = '',
  timezone = 'EAT · UTC+3'
where id = 1
  and (
    city ilike '%hargeisa%'
    or city ilike '%hargeysa%'
    or country ilike '%somaliland%'
    or coordinates like '%09°33%'
  );
