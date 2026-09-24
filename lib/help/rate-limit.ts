type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();

/**
 * Simple in-memory sliding window limiter (per process).
 * Adequate for a single Railway instance; not shared across replicas.
 * When running multi-replica, replace this adapter with Redis/Upstash
 * while keeping the same consumeRateLimit interface.
 */
export function consumeRateLimit(params: {
  key: string;
  limit: number;
  windowMs: number;
  now?: number;
}): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = params.now ?? Date.now();
  const existing = buckets.get(params.key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(params.key, {
      count: 1,
      resetAt: now + params.windowMs,
    });
    return { ok: true };
  }

  if (existing.count >= params.limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true };
}

/** Test helper — clears in-memory buckets. */
export function resetRateLimitBucketsForTests(): void {
  buckets.clear();
}
