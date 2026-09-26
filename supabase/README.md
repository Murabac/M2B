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

## Run the migration

1. Open **SQL Editor**
2. Paste and run: `supabase/migrations/20260926000000_init.sql`

Or with the CLI:

```bash
npx supabase link --project-ref <your-ref>
npx supabase db push
```

## After the migration

Creates in schema `m2b`:

- Tables: `services`, `projects`, `project_images`, `testimonials`, `admin_users`
- Enum: `project_category`
- RLS + `m2b.is_admin()`
- Storage bucket: `m2b-project-images`
- Seed: 4 published services

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
select m2b.is_admin(); -- false unless authenticated as the admin
```

## App code

| Path | Role |
| ---- | ---- |
| `src/lib/supabase/client.ts` | Browser client (`db.schema = m2b`) |
| `src/lib/supabase/server.ts` | Server Components / Route Handlers |
| `src/lib/supabase/middleware.ts` | Session refresh helper (Wave 6) |
| `src/lib/supabase/types.ts` | Database TypeScript types |
| `src/lib/supabase/queries.ts` | Public typed reads |
| `src/lib/supabase/constants.ts` | Schema + bucket names |
