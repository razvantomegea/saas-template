import type { MetadataRoute } from "next";

import { APP_LOCALES } from "@/lib/i18n/locales";
import {
  ALLOWED_AI_CRAWLERS,
  BLOCKED_SCRAPER_BOTS,
} from "@/lib/security/scraper-bots";
import { getSiteUrl } from "@/lib/seo/site";

const PRIVATE_PATHS = [
  "/dashboard/",
  ...APP_LOCALES.map((locale) => `/${locale}/dashboard/`),
  "/api/",
] as const;

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_PATHS],
      },
      ...ALLOWED_AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: [...PRIVATE_PATHS],
      })),
      ...BLOCKED_SCRAPER_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
