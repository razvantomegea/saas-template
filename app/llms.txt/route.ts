import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants/branding";
import { HELP_PATH } from "@/lib/help/constants";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

export const dynamic = "force-static";

/**
 * Prefer an explicit public URL. For local `pnpm build` / prerelease without
 * `.env`, fall back to https://example.com rather than failing or shipping
 * localhost links. Production deploys must set NEXT_PUBLIC_SITE_URL (or
 * BETTER_AUTH_URL) — see docs/setup.md.
 */
function resolveLlmsSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.BETTER_AUTH_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://example.com";
  }
  return getSiteUrl();
}

/**
 * Agent-facing site summary per https://llmstxt.org
 * Public marketing/docs only — no dashboard or API endpoints.
 */
export async function GET(): Promise<Response> {
  const siteUrl = resolveLlmsSiteUrl();

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${BRAND_NAME} is a SaaS starter template. ${BRAND_TAGLINE}

## Docs

- [Home](${siteUrl}/): Product overview and getting started
- [Pricing](${siteUrl}/pricing): Plans and billing
- [Help & FAQ](${siteUrl}${HELP_PATH}): FAQ, private support, Help bot
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
