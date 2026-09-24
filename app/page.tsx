import type { Metadata } from "next";
import Link from "next/link";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants/branding";
import {
  createHomePageJsonLd,
  createOrganizationJsonLd,
} from "@/lib/seo/json-ld";
import { createSiteMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createSiteMetadata();

const FEATURES = [
  {
    title: "Auth included",
    body: "Email/password and Google sign-in via Better Auth, with session gating on the dashboard.",
  },
  {
    title: "Billing wired up",
    body: "Stripe checkout, customer portal, and webhooks keep your Postgres profile in sync.",
  },
  {
    title: "Demo feature",
    body: "Notes shows real auth + billing gating end to end — swap it for your product.",
  },
  {
    title: "Push notifications",
    body: "Web push with VAPID keys and an SSRF-safe endpoint allowlist, ready to use.",
  },
  {
    title: "PWA out of the box",
    body: "Installable on iOS and Android with a guided install tutorial.",
  },
  {
    title: "Deploy on Vercel",
    body: "Supabase Postgres + Drizzle ORM, Vercel Analytics and Speed Insights included.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: createHomePageJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: createOrganizationJsonLd() }}
      />
      <MarketingHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            {BRAND_NAME}
          </h1>
          <p className="mt-4 text-lg text-zinc-400">{BRAND_TAGLINE}</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center rounded-lg bg-emerald-600 px-6 font-medium text-white hover:bg-emerald-500"
            >
              Start free trial
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-lg border border-zinc-700 px-6 font-medium text-zinc-200 hover:bg-zinc-900"
            >
              View pricing
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
              >
                <h2 className="text-lg font-semibold text-zinc-100">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
