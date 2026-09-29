# Supabase setup (Wave 3)

M2B uses a dedicated Postgres schema: **`m2b`** (not `public`), so it can share a
multi-schema Supabase project without colliding with other apps' tables
(e.g. an existing `public.admin_users`).

## Env vars

Copy `.env.example` to `.env.local` and fill in values from your Supabase project
(**Settings → API**):

| Variable | Where used | Notes |
| -------- | ---------- | ----- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + server | `anon` / `public` key (RLS applies) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (optional) | Bypass RLS — never put in client code |

Until these are set, typed query helpers return empty data so the site still builds.

## Expose the `m2b` schema (required)

1. Supabase Dashboard → **Project Settings → API → Exposed schemas**
2. Add `m2b` alongside `public`
3. Save

Without this, the JS client cannot query `m2b` tables.

## Run the migrations

1. Open **SQL Editor**
2. Paste and run in order:
   - `supabase/migrations/20260926000000_init.sql`
   - `supabase/migrations/20260927000000_home_content.sql`
   - `supabase/migrations/20260927000001_capabilities_bullets.sql`
   - `supabase/migrations/20260927000002_products_bento.sql`
   - `supabase/migrations/20260927000003_project_logo_urls.sql`
   - `supabase/migrations/20260927000004_work_page_fields.sql`
   - `supabase/migrations/20260927000005_product_metrics.sql`
   - `supabase/migrations/20260927000006_capability_pillars.sql`
   - `supabase/migrations/20260927000007_contact_inquiries.sql`
   - `supabase/migrations/20260927000008_admin_cms.sql`
   - `supabase/migrations/20260927000009_studio_team.sql`
   - `supabase/migrations/20260927000010_studio_team_photo.sql`
   - `supabase/migrations/20260927000011_worldwide_positioning.sql`
   - `supabase/migrations/20260927000012_murabac_portfolio_projects.sql`
   - `supabase/migrations/20260927000013_split_aragsan_dugsi.sql`

Or with the CLI:

```bash
npx supabase link --project-ref <your-ref>
npx supabase db push
```

## After the migrations

Creates in schema `m2b`:

- Tables: `services`, `projects`, `project_images`, `testimonials`, `admin_users`, `trust_sectors`, `process_steps`
- Enum: `project_category`
- Extra project columns for hero mesh: `logo_url`, `mesh_preview`, `mesh_category`, `accent_color`, `show_in_hero`, `hero_sort_order`
- Services `bullets` jsonb + 6 Design Ref capability seeds
- RLS + `m2b.is_admin()`
- Storage bucket: `m2b-project-images`
- Seed: services, trust sectors, process steps, and hero project rows (when matching slugs exist)

## Add the single admin

1. **Authentication → Users** — create the admin (email + password)
2. Copy their UUID
3. SQL Editor:

```sql
insert into m2b.admin_users (user_id)
values ('00000000-0000-0000-0000-000000000000'); -- replace with the auth user id
```

## Verify

```sql
select slug, title, is_published from m2b.services order by sort_order;
select slug, show_in_hero, hero_sort_order from m2b.projects where show_in_hero order by hero_sort_order;
select slug, name, is_published from m2b.trust_sectors order by sort_order;
select step_key, title, is_published from m2b.process_steps order by sort_order;
select m2b.is_admin(); -- false unless authenticated as the admin
```

## App code

| Path | Role |
| ---- | ---- |
| `src/lib/supabase/client.ts` | Browser client (`db.schema = m2b`) |
| `src/lib/supabase/server.ts` | Server Components / Route Handlers |
| `src/lib/supabase/middleware.ts` | Session refresh + `/admin` auth guard |
| `src/lib/supabase/admin-auth.ts` | `requireAdmin` / session helpers |
| `src/lib/supabase/admin-queries.ts` | Admin list/read helpers |
| `src/lib/admin/actions.ts` | CMS server actions (CRUD) |
| `src/lib/supabase/types.ts` | Database TypeScript types |
| `src/lib/supabase/queries.ts` | Public typed reads (incl. site_settings) |
| `src/lib/supabase/constants.ts` | Schema + bucket names |
| `src/lib/contact/channels.ts` | Contact channels from site_settings + env fallback |

## Admin CMS (Wave 6)

1. Run `20260927000008_admin_cms.sql`
2. Create Auth user + insert into `m2b.admin_users`
3. Sign in at `/admin/login`
4. Edit Studio contact channels under `/admin/studio` (becomes public site source of truth)
