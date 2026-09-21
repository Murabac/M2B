# M2B Website — Project Context (single source of truth)

## Working Protocol

- Work happens in waves. When the user asks "which wave are we in?" (or similar): read this file, find the first wave in the Progress Tracker that is not Done, state its name and scope in two lines, then execute that wave completely. Do only that wave.
- "Go to wave N" or "redo wave N" means do that wave.
- At the end of a wave: run lint, typecheck and build and fix all errors; mark the wave Done in the tracker with the date and short notes; list files changed; list manual steps for the user (env vars, SQL to run in Supabase, assets to add); then stop and wait.
- If something is not specified, choose a sensible default, log it in the Decisions Log, and continue. Ask only if blocked.
- If the user changes a requirement, update this file first, then the code.
- Never put secrets or the Supabase service-role key in client code. Use placeholders for all real values.
- Do NOT build: a quote form, any contact form, or an About page.

## Company and goals

- Company: **M2B**, a software / IT services company.
- Goals: showcase portfolio and case studies, generate client leads, build brand credibility.
- Look and feel: corporate and trustworthy, warm and local, modern and bold, minimal and clean. Light theme only.
- Leads come from direct contact only: WhatsApp, email, phone. No forms.

## Stack

- Next.js (App Router, TypeScript), Tailwind CSS, Framer Motion for animation.
- next-intl for i18n. Supabase (Postgres, Auth, Storage) as backend, using `@supabase/ssr`.
- Hosting: Netlify. Analytics: Google Analytics 4.

## Languages and RTL

- Locales: `en` (default), `so` (Somali, Latin script), `ar` (Arabic, RTL). Locale-prefixed routes: `/en`, `/so`, `/ar`.
- UI strings live in `messages/en.json`, `so.json`, `ar.json`. Write good Somali and Arabic translations for every UI string (a native speaker will review later).
- CMS content (services, projects, testimonials) is English only. The interface around it is translated.
- Arabic: set `dir="rtl"`, use logical CSS (Tailwind `ms-`/`me-`/`ps-`/`pe-`/`start`/`end`), mirror directional icons and animations.

## Brand and design system

- Source pack: `Logo assets/` (Fonts, Icon, PNG, SVG). Runtime copies live in `public/brand/` and `src/fonts/`.
- Logo files:
  - `public/brand/M2B.svg` / `M2B.png` — mark (letters, swoosh arcs, pixel squares). Prefer SVG in the header.
  - `public/brand/M2B-lockup.svg` / `M2B-lockup.png` — stacked lockup with wordmark, “Technology | Innovation | Solutions”, and “Connecting today, building tomorrow”.
  - `public/brand/M2B-icon.png` — icon PNG of the mark.
- There are no separate `Gold.svg`, `Blue.svg`, or `gradient.svg` files; use the mark and the CSS brand gradient.
- The logo is navy and gold with a pixel-square motif and swoosh arcs. Reuse the pixel-square motif in the hero and section accents.
- Navy: `#1E3A5F` (main), `#2A5082` (mid), `#0A2850` (deep), `#082C56` (deeper).
- Gold: `#D4AF37` (main), `#D2A032` (highlight), `#FED863` (light highlight), `#BE8C28` (shadow), `#8D6501` (deep shadow).
- Brand gradient: `linear-gradient(135deg, #1E3A5F 0%, #2A5082 55%, #D4AF37 100%)`.
- Usage: white and off-white backgrounds, navy for headings and body text, gold for accents, buttons and decoration. Never use gold as body text on white (about 2:1 contrast). Use navy text on gold buttons.
- Fonts: **Kamerik 105** (Book 400 and Bold 700, via `next/font/local`) for English and Somali. **IBM Plex Sans Arabic** (via `next/font/google`) for Arabic, because Kamerik has no Arabic glyphs.
- Define all colors as CSS variables and Tailwind theme tokens. Meet WCAG AA contrast.
- Animation: bold hero (gradient, animated pixel squares) plus scroll-reveal animations on sections. Respect `prefers-reduced-motion`.

## Pages

- `/` Home: hero, services overview, featured portfolio, trust strip, contact section.
- `/services`: full services list.
- `/portfolio`: project grid with category filter.
- `/portfolio/[slug]`: project details page.
- `/admin/*`: single-admin CMS (see Admin).
- Services to feature: Custom software / web apps; Mobile apps; ERP systems (NOT Odoo); Websites and e-commerce.

## Contact

- Floating WhatsApp button on every public page (`wa.me` link with a prefilled message translated per locale).
- Contact section on Home with WhatsApp, email and phone cards.
- Call button in the header on mobile.
- Values come from env vars via `src/config/site.ts`: `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, international format), `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`. Use placeholders.

## Data model (Supabase)

- `services`: id, slug, title, description, icon, sort_order, is_published.
- `projects`: id, slug, title, tagline, description (markdown), category (web_app | mobile_app | erp | website_ecommerce), client_name, year, live_url, app_store_url, play_store_url, cover_image_url, is_featured, is_published, sort_order.
- `project_images`: id, project_id, image_url, alt_text, sort_order.
- `testimonials`: id, project_id, author_name, author_role, quote, sort_order, is_published.
- `admin_users`: user_id (the single admin).
- Storage bucket `project-images` (public read, admin write).
- RLS: public can read published rows only; only the admin can insert, update, delete. Seed the 4 services.

## Admin (CMS)

- One admin only. Supabase Auth email and password. Protect `/admin/*` with middleware.
- Admin UI is English only, `noindex`, excluded from the sitemap and hreflang.
- CMS scope: services descriptions, portfolio projects (all fields, cover image, gallery upload and ordering, publish and feature toggles) and testimonials per project. Nothing else is editable.
- Contact details are NOT in the CMS; they are env vars.

## SEO and Analytics

- Per-page metadata, hreflang alternates for en, so, ar plus `x-default`.
- Dynamic `sitemap.ts` including published project slugs for all locales. `robots.ts` disallows `/admin`.
- GA4 via `NEXT_PUBLIC_GA_ID`. Use Google Consent Mode v2 (default denied). Cookie consent banner in all 3 languages; load analytics only after consent.
- Custom events: `whatsapp_click`, `email_click`, `phone_click`, each with a `location` parameter (floating_button, header, home_section, footer).

## Waves

1. **Foundation**: project setup, folder structure, Tailwind tokens, fonts, next-intl with en/so/ar and RTL, `src/config/site.ts`, `.env.example`, placeholder pages, brand assets folder.
2. **Layout and contact**: header (logo, nav, language switcher, mobile menu, mobile call button), footer, floating WhatsApp button, reusable contact link components with click-event hooks, translated UI strings.
3. **Supabase backend**: SQL migrations in `supabase/migrations`, RLS, storage bucket, admin allow-list, seed data, server and browser clients, typed queries, setup README and env vars.
4. **Home page**: bold hero with animated pixel squares, services overview, featured portfolio from Supabase, trust strip, contact section, scroll animations.
5. **Services and Portfolio pages**: `/services`, `/portfolio` with category filter, `/portfolio/[slug]` with description, gallery, client, year, links and testimonials; empty, loading and 404 states.
6. **Admin and CMS**: login, protected routes, dashboard, CRUD for services, projects (image upload, gallery ordering, toggles) and testimonials.
7. **SEO and Analytics**: metadata, hreflang, dynamic sitemap, robots, GA4 with consent mode, consent banner, contact click events.
8. **Polish and deploy**: responsive and RTL QA, accessibility pass, performance (next/image, lazy loading), `netlify.toml`, env var checklist, deployment steps, final QA checklist.

## Progress Tracker

| Wave | Name | Status | Date | Notes |
| ---- | ---- | ------ | ---- | ----- |
| 1 | Foundation | Done | 2026-09-21 | Next.js 16.3 + Tailwind v4 + next-intl (en/so/ar, RTL). Tokens, Kamerik 105 + IBM Plex Arabic, site config, placeholder pages, logos copied from Logo assets. |
| 2 | Layout and contact | Not started | | |
| 3 | Supabase backend | Not started | | |
| 4 | Home page | Not started | | |
| 5 | Services and Portfolio pages | Not started | | |
| 6 | Admin and CMS | Not started | | |
| 7 | SEO and Analytics | Not started | | |
| 8 | Polish and deploy | Not started | | |

## Decisions Log

- 2026-09-21: Use Next.js 16.3, React 19, and Tailwind CSS v4 from current `create-next-app` (latest stable scaffold).
- 2026-09-21: npm package name is `m2b` because npm does not allow capital letters in the folder name `M2B`.
- 2026-09-21: Always-prefixed locales (`/en`, `/so`, `/ar`). `/admin` is excluded from i18n routing so it stays unprefixed and English-only.
- 2026-09-21: Dual root layouts via `(public)` and `(admin)` route groups so Arabic can set `dir="rtl"` on `<html>` while admin stays LTR English.
- 2026-09-21: i18n request config still uses `requestLocale` (supported) because admin routes sit outside `[locale]` and `next/root-params` would not apply there.
- 2026-09-21: Contact placeholders are `252000000000`, `hello@example.com`, `+252000000000` until real values are provided.
- 2026-09-21: Installed `framer-motion` with the stack now; unused until later waves.
- 2026-09-21: Light theme only — no `prefers-color-scheme: dark` tokens. Reduced-motion CSS is in `globals.css`.
- 2026-09-21: Set `turbopack.root` to this project so a parent `package-lock.json` is ignored.
- 2026-09-21: Copied the `Logo assets` pack into `public/brand` (`M2B` mark, lockup, icon). No Gold/Blue/gradient SVGs were in the pack.
- 2026-09-21: Latin UI font is Kamerik 105 from the brand pack, not Plus Jakarta Sans. Arabic still uses IBM Plex Sans Arabic.
- 2026-09-21: Brand lines from the lockup: “Technology | Innovation | Solutions” and “Connecting today, building tomorrow”.
