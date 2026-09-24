import { describe, expect, it, beforeEach } from "vitest";

import {
  consumeRateLimit,
  resetRateLimitBucketsForTests,
} from "@/lib/help/rate-limit";

describe("consumeRateLimit", () => {
  beforeEach(() => {
    resetRateLimitBucketsForTests();
  });

  it("allows requests under the limit", () => {
    expect(
      consumeRateLimit({ key: "a", limit: 2, windowMs: 60_000, now: 1_000 }),
    ).toEqual({ ok: true });
    expect(
      consumeRateLimit({ key: "a", limit: 2, windowMs: 60_000, now: 1_001 }),
    ).toEqual({ ok: true });
  });

  it("blocks when the limit is exceeded", () => {
    consumeRateLimit({ key: "b", limit: 1, windowMs: 10_000, now: 5_000 });
    const blocked = consumeRateLimit({
      key: "b",
      limit: 1,
      windowMs: 10_000,
      now: 5_100,
    });
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfterSec).toBeGreaterThan(0);
    }
  });

  it("resets after the window", () => {
    consumeRateLimit({ key: "c", limit: 1, windowMs: 1_000, now: 0 });
    expect(
      consumeRateLimit({ key: "c", limit: 1, windowMs: 1_000, now: 1_001 }),
    ).toEqual({ ok: true });
  });
});
