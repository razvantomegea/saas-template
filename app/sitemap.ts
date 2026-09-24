import type { MetadataRoute } from "next";

import { APP_LOCALES } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { getPublicSitemapRoutes, getSiteUrl } from "@/lib/seo/site";

const ROUTE_PRIORITIES: Record<string, number> = {
  "/": 1,
  "/pricing": 0.9,
  "/help": 0.8,
  "/privacy": 0.5,
  "/terms": 0.5,
  "/cookies": 0.5,
};

function toAbsoluteUrl(siteUrl: string, path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return APP_LOCALES.flatMap((locale) =>
    getPublicSitemapRoutes().map((route) => ({
      url: toAbsoluteUrl(siteUrl, localizedPath(locale, route)),
      lastModified,
      changeFrequency: (route === "/" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: ROUTE_PRIORITIES[route] ?? 0.8,
    })),
  );
}
