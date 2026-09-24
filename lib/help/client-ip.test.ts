import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

import { clientIpFromRequest } from "@/lib/help/client-ip";

describe("clientIpFromRequest", () => {
  it("prefers cf-connecting-ip over x-real-ip", () => {
    const req = new NextRequest("http://localhost/", {
      headers: {
        "cf-connecting-ip": "198.51.100.7",
        "x-real-ip": "203.0.113.1",
        "x-forwarded-for": "192.0.2.1",
      },
    });
    expect(clientIpFromRequest(req)).toBe("198.51.100.7");
  });

  it("uses x-real-ip when Cloudflare header is absent", () => {
    const req = new NextRequest("http://localhost/", {
      headers: {
        "x-real-ip": "203.0.113.9",
        "x-forwarded-for": "192.0.2.9",
      },
    });
    expect(clientIpFromRequest(req)).toBe("203.0.113.9");
  });

  it("ignores client-controlled x-forwarded-for and falls back to unknown", () => {
    const req = new NextRequest("http://localhost/", {
      headers: { "x-forwarded-for": "192.0.2.55" },
    });
    expect(clientIpFromRequest(req)).toBe("unknown");
  });
});
