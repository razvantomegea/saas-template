const LOCAL_DEV_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
] as const;

function normalizeOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return new URL(trimmed).origin;
  } catch {
    return null;
  }
}

function buildTrustedOrigins(): Set<string> {
  const origins = new Set<string>([...LOCAL_DEV_ORIGINS]);

  for (const envValue of [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  ]) {
    const origin = normalizeOrigin(envValue);
    if (origin) {
      origins.add(origin);
    }
  }

  return origins;
}

const TRUSTED_ORIGINS = buildTrustedOrigins();

export function getTrustedOrigins(): string[] {
  return [...TRUSTED_ORIGINS];
}

export function isTrustedOrigin(origin: string | null): origin is string {
  if (!origin) {
    return false;
  }

  return TRUSTED_ORIGINS.has(origin);
}
