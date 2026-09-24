import { BRAND_NAME } from "@/lib/constants/branding";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

export function createHomePageJsonLd(overrides?: {
  name?: string;
  description?: string;
  urlPath?: string;
}): string {
  const siteUrl = getSiteUrl();
  const path = overrides?.urlPath ?? "";

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: overrides?.name ?? SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: overrides?.description ?? SITE_DESCRIPTION,
    url: `${siteUrl}${path === "/" ? "" : path}`,
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description: "Plans from Starter tier with 14-day trial",
    },
  });
}

export function createOrganizationJsonLd(): string {
  const siteUrl = getSiteUrl();

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
  });
}

export function createWebSiteJsonLd(overrides?: {
  description?: string;
  urlPath?: string;
}): string {
  const siteUrl = getSiteUrl();
  const path = overrides?.urlPath ?? "";

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${siteUrl}${path === "/" ? "" : path}`,
    description: overrides?.description ?? SITE_DESCRIPTION,
  });
}

export function createBreadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): string {
  const siteUrl = getSiteUrl();

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  });
}

export function createFaqPageJsonLd(
  items: readonly { question: string; answer: string }[],
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}
