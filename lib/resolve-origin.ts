export function resolveRequestOrigin(params: {
  originHeader: string | null;
  nextUrlOrigin?: string;
  fallbackEnvUrl?: string;
  siteUrlEnv?: string;
}): string | null {
  const candidate =
    params.originHeader ??
    params.nextUrlOrigin ??
    params.fallbackEnvUrl ??
    params.siteUrlEnv ??
    "";

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}
