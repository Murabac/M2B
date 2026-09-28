# M2B Website — Project Context (single source of truth)

## Working Protocol

- Work happens in waves. When the user asks "which wave are we in?" (or similar): read this file, find the first wave in the Progress Tracker that is not Done, state its name and scope in two lines, then execute that wave completely. Do only that wave.
- "Go to wave N" or "redo wave N" means do that wave.
- At the end of a wave: run lint, typecheck and build and fix all errors; mark the wave Done in the tracker with the date and short notes; list files changed; list manual steps for the user (env vars, SQL to run in Supabase, assets to add); then stop and wait.
- If something is not specified, choose a sensible default, log it in the Decisions Log, and continue. Ask only if blocked.
- If the user changes a requirement, update this file first, then the code.
- Never put secrets or the Supabase service-role key in client code. Use placeholders for all real values.
- Do NOT build: a quote form or an About page. Studio (`/studio`) and Contact (`/contact`) inquiry form are allowed.

## Company and goals

- Company: **M2B**, a software / IT services company.
- Goals: showcase portfolio and case studies, generate client leads, build brand credibility.
- Look and feel: corporate and trustworthy, warm and local, modern and bold, minimal and clean. Light theme only.
- Leads: WhatsApp, email, phone via `ContactLink`, plus the `/contact` project inquiry form (stored in Supabase `contact_inquiries`).

## Stack

- Next.js (App Router, TypeScript), Tailwind CSS, Framer Motion for animation.
- next-intl for i18n. Supabase (Postgres, Auth, Storage) as backend, using `@supabase/ssr`.
- Hosting: Netlify. Analytics: Google Analytics 4.

## Languages and RTL

- Locales: `en` (default), `so` (Somali, Latin script), `ar` (Arabic, RTL). Locale-prefixed routes: `/en`, `/so`, `/ar`.
- Language switcher shows `en` and `ar` only for now; Somali stays routed and translated but the switcher button is hidden.
- UI strings live in `messages/en.json`, `so.json`, `ar.json`. Write good Somali and Arabic translations for every UI string (a native speaker will review later).
- CMS content (services, projects, trust sectors, process steps, testimonials) is English only. The interface around it is translated.
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
- Fonts: **Kamerik 105** (Book 400 and Bold 700, via `next/font/local`) for English and Somali. **IBM Plex Sans Arabic** (via `next/font/local`, woff2 in `src/fonts/`) for Arabic, because Kamerik has no Arabic glyphs.
- Define all colors as CSS variables and Tailwind theme tokens. Meet WCAG AA contrast.
- Animation: bold hero (gradient, animated pixel squares) plus scroll-reveal animations on sections. Respect `prefers-reduced-motion`.

## Pages

- `/` Home: Design Ref home composition (hero constellation, trust, featured, capabilities, bento, process, contact).
- `/services`: full services list.
- `/portfolio`: Work / case studies grid with sector filters and search.
- `/products`: Product OS pedestal grid (live / mobile / ops filters).
- `/portfolio/[slug]`: project details page.
- `/studio`: studio story, stats, and team (Design Ref StudioView).
- `/contact`: project inquiry form (custom investment amount) + HQ / channels (Design Ref ContactView).
- `/admin/*`: single-admin CMS (see Admin).
- Services to feature: Custom software / web apps; Mobile apps; ERP systems (NOT Odoo); Websites and e-commerce.

## Home page target design

Locked visual reference: **`Design Ref/`** (Vite studio prototype). Port its cinematic navy/gold language and home section composition into the Next.js app. Keep Kamerik + IBM Plex Arabic. Reuse `ContactLink`, Supabase queries, and production routes.

### Production IA (do not invent Design Ref routes)

- Home sections only on `/` (see section order below).
- Work styling maps to `/portfolio` + `/portfolio/[slug]`.
- Products styling maps to `/products` (same project records, Product OS pedestal UI).
- Capabilities styling maps to `/services` (Supabase capability pillars).
- Studio styling maps to `/studio` (studio story — not an About page).
- Contact inquiry form maps to `/contact` (custom USD amount; still keep `ContactLink` channels).

### Do not port from Design Ref

- Gemini API for contact.
- Dark/light theme toggle (dark navy bands for hero/process/footer are OK; no toggle).
- Navbar viewport preview tools (1440 / 390 / fluid).
- SPA `PageId` router and hardcoded `projectsData` as the live data source (may inform seed SQL only).
- Outfit / Plus Jakarta / Amiri font stacks — keep Kamerik + IBM Plex Arabic.
- About page.

### Home section order (from Design Ref)

1. Hero constellation (`HeroConstellation`) — dark cinematic; CTAs to `/portfolio` and `#contact`.
2. Trust / sectors strip (`TrustStrip`).
3. Featured cases (`FeaturedCases`) — Supabase featured projects.
4. Capabilities band (`CapabilitiesBand`) — Supabase published services, link to `/services`.
5. Products bento (`ProductsBento`) — published projects (limit 6–8), link to `/portfolio`.
6. Process orbit (`ProcessOrbit`) — static 5-step “How we ship” copy in messages.
7. Contact (`ContactView` visual + channels) — WhatsApp / email / phone via `ContactLink` (`home_section`); full inquiry form lives on `/contact`.

### Shared setup

1. UI strings in `messages/en.json`, `so.json`, `ar.json` (CMS titles stay English).
2. Page shell fetches services + featured + published projects once.
3. RTL (`ar`) and `prefers-reduced-motion` on animated sections.
4. Header: dark cinematic bar (Design Ref) — brand lockup + Work / Products / Capabilities / Studio / Contact + EN/AR pill + Start a Project CTA; no theme toggle. Studio → `/studio`; Contact → `/contact`; Work → `/portfolio`; Products → `/products`.
5. Footer: Design Ref rhythm + studio cues; contact links to `/contact` and channel `ContactLink`s.

## Contact

- Floating WhatsApp button on every public page (`wa.me` link with a prefilled message translated per locale).
- Contact section on Home with WhatsApp, email and phone cards (`ContactLink`).
- Full inquiry form on `/contact`: project type, custom estimated investment (USD amount the user types), name, email, org, WhatsApp/phone, brief. Submissions go to `m2b.contact_inquiries` (anon insert; admin read).
- Call button in the header on mobile.
- Values come from env vars via `src/config/site.ts`: `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, international format), `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`. Use placeholders.

## Data model (Supabase)

- Schema: **`m2b`** (dedicated schema for multi-schema projects; expose it under Project Settings → API).
- Storage bucket: `m2b-project-images` (public read, admin write).
- `services`: id, slug, title, description, icon, bullets (jsonb string array), sort_order, is_published.
- `projects`: id, slug, title, tagline, description (markdown), category (web_app | mobile_app | erp | website_ecommerce), work_category (government | operations | education | faith | commerce | mobile | websites), sector, status, outcome, stack (jsonb string array), client_name, year, live_url, app_store_url, play_store_url, cover_image_url, logo_url, mesh_preview, mesh_category, accent_color, stack_line, metric_label, show_in_hero, hero_sort_order, show_in_bento, bento_sort_order, is_featured, is_published, sort_order.
- `project_images`: id, project_id, image_url, alt_text, sort_order.
- `testimonials`: id, project_id, author_name, author_role, quote, sort_order, is_published.
- `capability_pillars`: id, slug, title, tagline, icon, technologies (jsonb `{name, desc}` array), sort_order, is_published — Services page Engineer/Operate/Lead columns.
- `trust_sectors`: id, slug, name, proof, metric, icon, sort_order, is_published (home trust strip).
- `process_steps`: id, step_key, title, description, deliverables (jsonb string array), sort_order, is_published (home process orbit).
- `contact_inquiries`: id, project_type, estimated_amount_usd, full_name, email, organization, phone, project_brief, locale, created_at — public insert; admin select/delete.
- `admin_users`: user_id (the single admin).
- RLS: public can read published rows only; only the admin can insert, update, delete. Seed the 4 services; home migration seeds trust sectors, process steps, and hero project fields.

## Admin (CMS)

- One admin only. Supabase Auth email and password. Protect `/admin/*` with middleware.
- Admin UI is English only, `noindex`, excluded from the sitemap and hreflang.
- CMS scope: services (with bullets), portfolio projects (all fields including hero/bento flags, cover image, gallery upload and ordering, publish and feature toggles), trust sectors, process steps, and testimonials per project. Contact details are NOT in the CMS; they are env vars.

## SEO and Analytics

- Per-page metadata, hreflang alternates for en, so, ar plus `x-default`.
- Dynamic `sitemap.ts` including published project slugs for all locales. `robots.ts` disallows `/admin`.
- GA4 via `NEXT_PUBLIC_GA_ID`. Use Google Consent Mode v2 (default denied). Cookie consent banner in all 3 languages; load analytics only after consent.
- Custom events: `whatsapp_click`, `email_click`, `phone_click`, each with a `location` parameter (floating_button, header, home_section, footer).

## Waves

1. **Foundation**: project setup, folder structure, Tailwind tokens, fonts, next-intl with en/so/ar and RTL, `src/config/site.ts`, `.env.example`, placeholder pages, brand assets folder.
2. **Layout and contact**: header (logo, nav, language switcher, mobile menu, mobile call button), footer, floating WhatsApp button, reusable contact link components with click-event hooks, translated UI strings.
3. **Supabase backend**: SQL migrations in `supabase/migrations`, RLS, storage bucket, admin allow-list, seed data, server and browser clients, typed queries, setup README and env vars.
4. **Home page**: bold hero, services overview, featured portfolio from Supabase, trust/value strip, contact section, scroll animations. Target layout documented under **Home page target design** (mock rebuild is a follow-up pass on this wave’s output).
5. **Services and Portfolio pages**: `/services`, `/portfolio` with category filter, `/portfolio/[slug]` with description, gallery, client, year, links and testimonials; empty, loading and 404 states.
6. **Admin and CMS**: login, protected routes, dashboard, CRUD for services, projects (image upload, gallery ordering, toggles) and testimonials.
7. **SEO and Analytics**: metadata, hreflang, dynamic sitemap, robots, GA4 with consent mode, consent banner, contact click events.
8. **Polish and deploy**: responsive and RTL QA, accessibility pass, performance (next/image, lazy loading), `netlify.toml`, env var checklist, deployment steps, final QA checklist.

## Progress Tracker

| Wave | Name | Status | Date | Notes |
| ---- | ---- | ------ | ---- | ----- |
| 1 | Foundation | Done | 2026-09-21 | Next.js 16.3 + Tailwind v4 + next-intl (en/so/ar, RTL). Tokens, Kamerik 105 + IBM Plex Arabic, site config, placeholder pages, logos copied from Logo assets. |
| 2 | Layout and contact | Done | 2026-09-26 | Header (logo, nav, language switcher, mobile menu, mobile call), footer, floating WhatsApp, ContactLink + trackContactClick hooks, en/so/ar strings. |
| 3 | Supabase backend | Done | 2026-09-26 | Migration (schema, RLS, storage, seed 4 services), @supabase/ssr clients, typed queries, supabase/README.md, env vars. |
| 4 | Home page | Done | 2026-09-26 | Rebuilt to mock target: 2-col hero + SVG visual, 2×2 service cards, featured work, 4-col value strip, #contact panels. |
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
- 2026-09-26: Self-host IBM Plex Sans Arabic via `next/font/local` (woff2 in `src/fonts/`) instead of `next/font/google`, so builds work offline / without fonts.googleapis.com.
- 2026-09-26: Contact click analytics stub pushes `whatsapp_click` / `email_click` / `phone_click` to `dataLayer` and a `m2b:contact_click` CustomEvent; GA4 wiring stays Wave 7.
- 2026-09-26: Hide Somali (`so`) from the language switcher UI; keep `/so` routes and messages.
- 2026-09-26: Supabase clients use `@supabase/ssr`. Typed public queries return `[]` / `null` when env vars are unset so builds work before a project is linked.
- 2026-09-26: `admin_users` has no client insert policy — seed the single admin UUID via SQL after creating the Auth user.
- 2026-09-26: M2B tables live in schema `m2b` (not `public`) for shared multi-schema Supabase projects; storage bucket is `m2b-project-images`.
- 2026-09-26: Home hero brand signal uses the inverted mark on the dark gradient (full-bleed); CMS titles/descriptions stay English-only.
- 2026-09-26: Approved home mock (navy/gold, 2-col hero with illustration, 2×2 service cards, featured work, 4-col value strip, contact panels). Documented under **Home page target design**. Still no About, forms, or theme toggle.
- 2026-09-26: Home rebuild uses an inline SVG `HeroVisual` (devices/panels) until a custom 3D illustration is added under `public/`.
- 2026-09-26: Design skills pass (Refero craft + Superdesign auth). Refero MCP styles unavailable (no subscription). Locked direction: CONTEXT mock + M2B navy/gold, light-first canvas, cards only for interactive grids, type scale tokens, less decorative chrome. Accent headline words kept because the approved mock uses them.
- 2026-09-26: Locked visual reference to `Design Ref/` studio prototype. Port home composition + cinematic navy/gold system into Next.js; keep production IA (services/portfolio), no form/theme toggle/viewport tools; Kamerik + IBM Plex Arabic.
- 2026-09-27: Home constellation, trust strip, and process steps are Supabase-backed (`show_in_hero` on projects; `trust_sectors`; `process_steps`). Section chrome stays in next-intl; CMS body copy stays English-only. Migration: `20260927000000_home_content.sql`.
- 2026-09-28: Portfolio `/portfolio` rebuilt as Design Ref WorkView (dark cinematic, category tabs, search). Projects gained `work_category`, `sector`, `status`, `outcome`, `stack`. Migration: `20260927000004_work_page_fields.sql`.
- 2026-09-28: Products `/products` rebuilt as Design Ref ProductsView (pedestal cards, live/mobile/ops filters). Projects gained `metrics` jsonb. Migration: `20260927000005_product_metrics.sql`.
- 2026-09-28: Allowed `/contact` inquiry form (Design Ref ContactView). Estimated investment is a custom USD amount field (not preset ranges). Submissions stored in `m2b.contact_inquiries`. Nav Contact + Start a Project → `/contact`. Migration: `20260927000007_contact_inquiries.sql`.
- 2026-09-28: Studio team section: Abdirahmaan Mire, Mohamed Bulbul (engineering equals), Adnan Bille (marketing/sales/non-technical). Equal partners framing — no hierarchy.
