# Setup guide

Step-by-step checklist to get this template running locally and in production.

## 1. Install dependencies

```bash
pnpm install
```

## 2. Database (Supabase Postgres)

1. Create a Supabase project.
2. Copy the **session pooler** connection string into `DATABASE_URL`.
3. Copy the **direct connection** string into `DIRECT_DATABASE_URL` (used only
   for migrations — see `lib/db/resolve-migrate-url.ts`).
4. Push the schema:
   ```bash
   pnpm db:push
   ```
   Or generate + apply versioned migrations:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

## 3. Auth (Better Auth)

1. Generate a secret: `openssl rand -base64 32` → `BETTER_AUTH_SECRET`.
2. Set `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` to your app's origin
   (`http://localhost:3000` locally).
3. (Optional) Google OAuth: create OAuth credentials in Google Cloud Console,
   set the redirect URI to `{BETTER_AUTH_URL}/api/auth/callback/google`, and
   fill in `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`. Google sign-in is
   automatically disabled if these are unset.

## 4. Email (Resend)

1. Create a Resend account and verify a sending domain.
2. Set `RESEND_API_KEY` and `EMAIL_FROM`.
3. Password-reset and delete-account emails use this — required for those
   flows to work.

## 5. Billing (Stripe)

1. Create two products in Stripe: **Starter** and **Pro**, each with a
   monthly and annual recurring price.
2. Set the four price ID env vars (`STRIPE_STARTER_MONTHLY_PRICE_ID`, etc.).
3. Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
4. Create a webhook endpoint pointing at `{origin}/api/stripe-webhook`
   listening for `checkout.session.completed`,
   `customer.subscription.updated`, `customer.subscription.deleted`, and
   `customer.subscription.paused`. Copy the signing secret into
   `STRIPE_WEBHOOK_SECRET`.
5. Locally, use the Stripe CLI to forward events:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```

## 6. Push notifications (Web Push / VAPID)

```bash
pnpm exec web-push generate-vapid-keys --json
```

Copy the output into `NEXT_PUBLIC_VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY`,
and set `VAPID_SUBJECT` to a `mailto:` address.

## 7. Deploy (Vercel)

1. Import the repo into Vercel.
2. Set all env vars from `.env.example` in the Vercel project settings.
3. Point the Stripe webhook and Google OAuth redirect URIs at the production
   domain.
4. Vercel Analytics and Speed Insights are wired in `app/providers.tsx` and
   load **only after** the visitor accepts analytics in the cookie banner.

## 8. Legal placeholders (required before production)

1. Edit `lib/legal/constants.ts` — company name, address, contact email, tax id,
   jurisdiction, product name.
2. Have a lawyer review `/privacy`, `/terms`, and `/cookies` (EN is authoritative;
   other locales may fall back to EN + a translation disclaimer).
3. Signup requires terms consent (`SignupTermsConsent`).

## 9. Help chatbot (optional)

Set `GOOGLE_GENERATIVE_AI_API_KEY` to enable the Gemini help bot on `/help`.
Without it, FAQ + the private support form still work. Admin users listed in
`ADMIN_USER_IDS` can open `/dashboard/admin/support`.

## 10. SEO / GEO (already wired)

No extra env needed beyond `NEXT_PUBLIC_SITE_URL` (also used by Stripe return
URLs and `llms.txt`):

- `app/sitemap.ts` → localized `/sitemap.xml` (11 locales)
- `app/robots.ts` → `/robots.txt`
- `app/llms.txt/route.ts` → `/llms.txt`

## 11. Quality / release

```bash
pnpm prerelease
# format → lint:fix → test:coverage → test:e2e → build → fallow:audit → version:bump
```

CI (`.github/workflows/release.yml`) runs `version:check`, lint, build,
coverage, Playwright, and `fallow audit --ci`. Version bumps happen locally
(and via pre-push on `main`), not inside the verify job.

## Everything else

- `E2E_MOCK_DASHBOARD=true` bypasses the session gate in `proxy.ts` and lets
  dashboard pages render mock data — used by `pnpm test:e2e` only. Never set
  this in a real environment.
- Manual PWA checklist: Android Chrome install prompt + iOS Safari Add to
  Home Screen sheet (`components/pwa/install-tutorial.tsx`).
- Theme: system / light / dark (Settings + FOUC-safe bootstrap).
- Locales: `en` (default, unprefixed) plus `ru`, `de`, `es`, `fr`, `zh`, `it`,
  `pt`, `tr`, `ja`, `ko` via URL prefix.
