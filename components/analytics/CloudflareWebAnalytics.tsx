"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/analytics/cookie-consent-context";

const token = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

export function CloudflareWebAnalytics() {
  const { analyticsEnabled } = useCookieConsent();

  if (!token || !analyticsEnabled) {
    return null;
  }

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token, spa: true })}
      strategy="afterInteractive"
    />
  );
}
