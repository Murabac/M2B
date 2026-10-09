-- M2B: TowerLine MoCIT leadership testimonials
-- Requires author_image_url (20260927000019_testimonial_author_image.sql)

insert into m2b.testimonials (
  project_id,
  author_name,
  author_role,
  author_image_url,
  quote,
  sort_order,
  is_published
)
select
  p.id,
  v.author_name,
  v.author_role,
  v.author_image_url,
  v.quote,
  v.sort_order,
  true
from m2b.projects p
cross join (
  values
    (
      'Dr. Cabdisalaan Xuseen Cawaale',
      'Minister of Communications & Technology (MoCIT), Republic of Somaliland',
      '/projects/testimonials/towerline/cabdisalaan-xuseen-cawaale.jpg',
      'TowerLine gives our ministry a sovereign, living map of every mast and frequency band. That clarity is how we protect spectrum, accelerate licensing, and hold operators to a national standard of accountability.',
      1
    ),
    (
      'Md. Aadan Cabdillaahi Cabdulle',
      'Director General, Ministry of Communications & Technology (MoCIT)',
      '/projects/testimonials/towerline/aadan-cabdillaahi-cabdulle.jpg',
      'We needed one registry the whole institution could trust — from field tablets to the directorate. TowerLine replaced fragmented paper trails with offline-capable inspections, structured licensing, and reports leadership can act on.',
      2
    ),
    (
      'Eng. Caydaruus Maxamed Abiib',
      'Director of the Telecom Department, MoCIT Somaliland',
      '/projects/testimonials/towerline/caydaruus-maxamed-abiib.jpg',
      'For telecom operations, the gap between the tower site and the ministry desk was the problem. TowerLine closes it: GPS photo proof in the field, Class A–C compliance scoring, and a geospatial command room our inspectors actually use.',
      3
    )
) as v(author_name, author_role, author_image_url, quote, sort_order)
where p.slug = 'towerline'
  and not exists (
    select 1
    from m2b.testimonials t
    where t.project_id = p.id
      and t.author_name = v.author_name
  );
