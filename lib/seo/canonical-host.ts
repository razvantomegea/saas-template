/** Canonical public host derived from NEXT_PUBLIC_SITE_URL (no hardcoded brand hosts). */
export function getCanonicalPublicHost(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.BETTER_AUTH_URL ??
    "http://localhost:3000";
  try {
    return new URL(raw).host;
  } catch {
    return "localhost:3000";
  }
}

export const CANONICAL_PUBLIC_HOST = getCanonicalPublicHost();

export function resolveRequestHost(hostHeader: string | null): string | null {
  if (!hostHeader) {
    return null;
  }
  return hostHeader.split(":")[0]?.trim().toLowerCase() || null;
}

/** Optional apex redirect — disabled by default for the template (no legacy hosts). */
export function shouldRedirectToCanonicalHost(_host: string | null): boolean {
  void _host;
  return false;
}
