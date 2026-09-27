-- Patch logo/cover URLs after copying assets into public/projects/
-- Safe to re-run anytime

update m2b.projects set
  logo_url = '/projects/towerline-logo.jpg',
  cover_image_url = coalesce(cover_image_url, '/projects/towerline.jpg'),
  updated_at = now()
where slug = 'towerline';

update m2b.projects set
  logo_url = '/projects/qaari-logo.svg',
  cover_image_url = coalesce(cover_image_url, '/projects/qaari.png'),
  updated_at = now()
where slug = 'qaari';

update m2b.projects set
  logo_url = '/projects/aragsan-logo.png',
  cover_image_url = coalesce(cover_image_url, '/projects/aragsan-full.png'),
  updated_at = now()
where slug = 'aragsan-dugsi';

update m2b.projects set
  logo_url = '/projects/ekaadh-logo.png',
  cover_image_url = '/projects/ekaadh-logo.png',
  updated_at = now()
where slug = 'ekaadh';

update m2b.projects set
  logo_url = '/projects/jimicso-logo.png',
  cover_image_url = '/projects/jimicso.png',
  updated_at = now()
where slug = 'jimicso';

update m2b.projects set
  logo_url = '/projects/suuqsade-logo.png',
  cover_image_url = '/projects/suuqsade-logo.png',
  updated_at = now()
where slug = 'suuqsade';

update m2b.projects set
  logo_url = '/projects/biloop-logo.png',
  cover_image_url = '/projects/biloop-logo.png',
  updated_at = now()
where slug = 'biloop';

update m2b.projects set
  logo_url = '/projects/kobneti-logo.png',
  cover_image_url = '/projects/kobneti-logo.png',
  updated_at = now()
where slug = 'kobneti';

update m2b.projects set
  logo_url = '/projects/reer-sh-yoonis-logo.png',
  cover_image_url = '/projects/reer-sh-yoonis-logo.png',
  updated_at = now()
where slug = 'reer-sh-yoonis';
