-- M2B: rename Qaari SL → Xulka Qur'aada + new brand logos
-- Run after 20260927000014_hero_ekaadh_acu_dugsi_logo.sql

update m2b.projects
set
  title = 'Xulka Qur''aada',
  tagline = 'Somali Quran reciters streaming with synchronized verse audio.',
  description = 'Web and Flutter apps for the Somali community and diaspora — follow-along Arabic typography, playlists, offline audio, and reciter catalogs.',
  client_name = 'Xulka Qur''aada',
  logo_url = '/projects/xulka-quraada-logo.png',
  cover_image_url = '/projects/xulka-quraada.png',
  mesh_preview = 'Surah Al-Mulk · Ayah Sync · 3G Edge',
  mesh_category = 'Sacred Audio',
  accent_color = '#0A3A2A',
  stack_line = coalesce(stack_line, 'Flutter · Laravel · Cloudflare R2'),
  updated_at = now()
where slug = 'qaari';

-- Trust strip proof line
update m2b.trust_sectors
set
  proof = 'Xulka Qur''aada & Maqal',
  updated_at = now()
where slug = 'media';

-- Capability / services bullet that still said Qaari SL
update m2b.services
set
  bullets = '[
    "Cloudflare R2 storage with edge-optimized streaming",
    "Real-time ayah/verse audio synchronization (Xulka Qur''aada)",
    "Background mobile playback with zero interruptions",
    "Adaptive bitrate streaming optimized for 3G/4G cellular constraints"
  ]'::jsonb,
  updated_at = now()
where slug = 'media-audio';
