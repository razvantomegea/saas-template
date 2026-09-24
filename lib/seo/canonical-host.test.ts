import { describe, expect, it } from "vitest";

import {
  CANONICAL_PUBLIC_HOST,
  getCanonicalPublicHost,
  resolveRequestHost,
  shouldRedirectToCanonicalHost,
} from "@/lib/seo/canonical-host";

describe("canonical-host", () => {
  it("derives the canonical public host from site URL env (or localhost)", () => {
    expect(typeof CANONICAL_PUBLIC_HOST).toBe("string");
    expect(CANONICAL_PUBLIC_HOST.length).toBeGreaterThan(0);
    expect(getCanonicalPublicHost()).toBe(CANONICAL_PUBLIC_HOST);
  });

  it("strips port from Host header", () => {
    expect(resolveRequestHost("example.com:443")).toBe("example.com");
  });

  it("returns null for missing Host header", () => {
    expect(resolveRequestHost(null)).toBeNull();
    expect(resolveRequestHost("")).toBeNull();
  });

  it.each([
    "example.com",
    "www.example.com",
    "localhost",
    "preview.vercel.app",
  ])("does not redirect host %s (template has no legacy hosts)", (host) => {
    expect(shouldRedirectToCanonicalHost(host)).toBe(false);
  });
});
