/**
 * Aggressive / competitive SEO scrapers blocked at the edge (proxy) and
 * signaled via robots.txt. AI answer-engine crawlers and standard search
 * engines are intentionally NOT listed here.
 */
export const BLOCKED_SCRAPER_BOTS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "PetalBot",
  "SerpstatBot",
  "Barkrowler",
] as const;

/**
 * AI answer-engine / training crawlers explicitly welcomed for citation SEO.
 * Paired with allow rules in robots.txt and `/llms.txt`.
 */
export const ALLOWED_AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
] as const;

export function isBlockedScraperUserAgent(
  userAgent: string | null | undefined,
): boolean {
  if (!userAgent) {
    return false;
  }

  const lower = userAgent.toLowerCase();
  return BLOCKED_SCRAPER_BOTS.some((bot) => lower.includes(bot.toLowerCase()));
}
