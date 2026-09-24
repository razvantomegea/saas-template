# ADR 001 — Stack choice

## Status

Accepted.

## Context

This template needed a batteries-included but not over-engineered starting
point for new SaaS products: auth, billing, Postgres, i18n, legal/help, and a
deploy target, without locking into a specific product domain.

## Decision

- **Next.js (App Router) + TypeScript strict** — one framework for marketing
  pages, the dashboard, and API routes; strong typing end to end.
- **Better Auth** over NextAuth/Auth.js or a hosted auth provider — self-hosted,
  works cleanly with Drizzle via `better-auth/adapters/drizzle`, and its email
  link (`buildAuthCallbackUrls`) and social-provider patterns proved reliable
  in the source project (`ea-sync`).
- **Drizzle ORM + Supabase Postgres** — typed schema-as-code, first-class
  migrations (`drizzle-kit`), and Supabase gives a managed Postgres with a
  connection pooler (`DATABASE_URL`) plus a direct connection for migrations
  (`DIRECT_DATABASE_URL`) — see `lib/db/resolve-migrate-url.ts`.
- **Stripe** for billing — Checkout + Customer Portal covers subscription
  upgrades/downgrades and self-serve cancellation without custom UI; webhooks
  keep `profiles.plan` / `profiles.subscriptionStatus` in sync
  (`lib/stripe/webhook-handlers.ts`).
- **Vercel** as the deploy target — Next.js-native, and `@vercel/analytics` +
  `@vercel/speed-insights` are drop-in (loaded only after cookie consent
  accepts analytics).
- **Custom i18n** (11 locales from ea-sync) with URL prefix routing via
  `proxy.ts`, `LocaleSwitcher`, hreflang, and EN deep-merge fallback — not
  next-intl, to keep routing explicit.
- **Theme** system/light/dark with FOUC-safe bootstrap (`lib/theme/theme.ts`) —
  adapted from romanian-deals.
- **Legal + help** — Privacy / Terms / Cookies pages, cookie consent banner,
  FAQ + optional Gemini help chat + support tickets (`ADMIN_USER_IDS` inbox).
- **Quality gates** — `pnpm prerelease` (format → lint:fix → test:coverage →
  test:e2e → build → fallow:audit → version:bump) and `.github/workflows/release.yml`
  matching ea-sync (version check in CI; bumps happen locally / on main release).
- **Resend** for transactional email; **Web Push (VAPID)** for notifications.

## Alternatives considered

- **Clerk / Auth0** for auth — rejected to keep self-hosted user data in app Postgres.
- **Prisma** — rejected; source patterns were Drizzle.
- **Supabase Auth** — rejected; Better Auth owns sessions.
- **EN-only / dark-only** — rejected; template includes 11 locales + system theme.
- **Lighter CI (lint-only)** — rejected; full prerelease/coverage/Fallow/e2e parity.
- **Railway** hosting — ea-sync uses Railway; this template standardizes on Vercel.

## Consequences

- Forks must replace `lib/legal/constants.ts` (and review policies) before production.
- Adding a billing plan means updating `lib/config/plans-display.ts` + Stripe price IDs.
- Help chatbot is optional at runtime when `GOOGLE_GENERATIVE_AI_API_KEY` is unset.
- CI does not bump versions — PRs must already be ahead of the latest `v*` tag.
