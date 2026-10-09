-- M2B: author photo on project testimonials
alter table m2b.testimonials
  add column if not exists author_image_url text;

comment on column m2b.testimonials.author_image_url is
  'Optional headshot URL for the case-page testimonial card';
