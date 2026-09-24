# SaaS Template

A reusable Next.js SaaS starter with auth, billing, push notifications, PWA
install, 11-locale i18n, light/dark/system theme, legal + cookie consent,
help/support, and a working demo feature (**Notes**) that proves the auth and
billing gates work end to end.

Extracted from production apps — see `docs/adr/001-stack.md` for stack
rationale and `AGENTS.md` for agent-facing conventions.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, Tailwind 4, TypeScript strict
- **Auth:** [Better Auth](https://www.better-auth.com/) (email/password + optional Google OAuth)
- **Database:** Supabase Postgres via [Drizzle ORM](https://orm.drizzle.team/)
- **Billing:** Stripe (Checkout + Customer Portal + webhooks)
- **Email:** Resend
- **Push:** Web Push (VAPID) with an SSRF-safe endpoint allowlist
- **i18n:** 11 locales with URL prefix routing + LocaleSwitcher
- **Theme:** system / light / dark (FOUC-safe bootstrap)
- **Deploy:** Vercel, with Analytics + Speed Insights gated on cookie consent

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in the values you need
pnpm db:push                 # or db:generate + db:migrate for versioned migrations
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

See `docs/setup.md` for the full checklist (Supabase, Better Auth, Stripe,
Resend, VAPID, legal constants, optional Gemini key, CI/release).

## Scripts

| Command                               | What it does                                 |
| ------------------------------------- | -------------------------------------------- |
| `pnpm dev`                            | Start the Next.js dev server                 |
| `pnpm build`                          | Production build + `tsc --noEmit` type check |
| `pnpm lint` / `lint:fix`              | ESLint                                       |
| `pnpm format`                         | Prettier write                               |
| `pnpm test` / `test:coverage`         | Vitest (+ coverage thresholds)               |
| `pnpm test:e2e`                       | Playwright smoke (`E2E_MOCK_DASHBOARD`)      |
| `pnpm fallow` / `fallow:audit`        | Fallow health / dead-code audit              |
| `pnpm version:bump` / `version:check` | Sync `package.json` + `lib/app-version.ts`   |
| `pnpm prerelease`                     | Full local gate before release               |
| `pnpm db:*`                           | Drizzle generate / migrate / push / studio   |

## Project layout

```
app/                  Routes — marketing, auth, legal, help, dashboard, API
components/           UI by domain (auth, help, legal, i18n, theme, pwa, …)
db/                   Drizzle schema (auth, billing, push, notes, supportTickets)
lib/                  Core modules — auth, stripe, i18n, legal, help, theme, …
scripts/              version bump, release, e2e prepare, git hooks
e2e/                  Playwright smoke specs
docs/                 Setup guide + ADRs
```

## Demo feature: Notes

`notes` + `lib/notes/queries.ts` + `app/dashboard/notes/` + `app/api/notes/*`
is a minimal CRUD feature gated by plan. Replace it once you do not need the
reference anymore.

## Branding & legal

- Swap `lib/constants/branding.ts` and `components/marketing/Logo.tsx`.
- **Replace** `lib/legal/constants.ts` and lawyer-review policies before go-live.
