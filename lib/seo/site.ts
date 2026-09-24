import type { Metadata } from "next";
import {
  BRAND_ICON,
  BRAND_NAME,
  BRAND_OG_IMAGE,
} from "@/lib/constants/branding";

export const SITE_NAME = BRAND_NAME;

const SITE_TAGLINE =
  "The Next.js SaaS starter with auth, billing, and a demo app built in";

export const SITE_DESCRIPTION =
  "SaaS Template ships Better Auth, Stripe billing, Supabase Postgres, push notifications, and a Notes demo feature so you can start building your product on day one.";

const SITE_KEYWORDS = [
  "SaaS starter",
  "Next.js template",
  "Better Auth",
  "Stripe billing",
  "Supabase Postgres",
  "Drizzle ORM",
];

/** Routes that skip the auth gate in `proxy.ts`. */
const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
  "/cookies",
  "/help",
] as const;

/** Marketing URLs listed in `sitemap.xml` (auth pages stay out). */
const SITEMAP_ROUTES = [
  "/",
  "/pricing",
  "/privacy",
  "/terms",
  "/cookies",
  "/help",
] as const;

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.BETTER_AUTH_URL ??
    "http://localhost:3000";

  return raw.replace(/\/$/, "");
}

export function createSiteMetadata(overrides: Metadata = {}): Metadata {
  const siteUrl = getSiteUrl();
  const defaultTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;
  const {
    openGraph: openGraphOverrides,
    twitter: twitterOverrides,
    ...restOverrides
  } = overrides;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: SITE_NAME,
      title: defaultTitle,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: BRAND_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} logo`,
        },
      ],
      ...openGraphOverrides,
    },
    twitter: {
      card: "summary",
      title: defaultTitle,
      description: SITE_DESCRIPTION,
      images: [BRAND_OG_IMAGE],
      ...twitterOverrides,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: BRAND_ICON,
      apple: BRAND_OG_IMAGE,
    },
    ...restOverrides,
  };
}

export function getPublicSitemapRoutes(): readonly string[] {
  return SITEMAP_ROUTES;
}

export function isPublicRoute(pathname: string): boolean {
  return (PUBLIC_ROUTES as readonly string[]).includes(pathname);
}
