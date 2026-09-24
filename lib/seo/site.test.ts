import { describe, expect, it } from "vitest";
import { createSiteMetadata, getSiteUrl, isPublicRoute } from "@/lib/seo/site";

describe("getSiteUrl", () => {
  it("strips a trailing slash", () => {
    const original = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(getSiteUrl()).toBe("https://example.com");
    process.env.NEXT_PUBLIC_SITE_URL = original;
  });
});

describe("createSiteMetadata", () => {
  it("builds a default title using the brand name", () => {
    const metadata = createSiteMetadata();
    expect(metadata.title).toMatchObject({
      default: expect.stringContaining("SaaS Template"),
    });
  });

  it("allows overriding openGraph fields", () => {
    const metadata = createSiteMetadata({
      title: "Custom title",
      openGraph: { title: "OG override" },
    });
    expect(metadata.title).toBe("Custom title");
    expect(metadata.openGraph?.title).toBe("OG override");
  });
});

describe("isPublicRoute", () => {
  it("allows known public routes", () => {
    expect(isPublicRoute("/")).toBe(true);
    expect(isPublicRoute("/pricing")).toBe(true);
    expect(isPublicRoute("/login")).toBe(true);
    expect(isPublicRoute("/privacy")).toBe(true);
    expect(isPublicRoute("/terms")).toBe(true);
    expect(isPublicRoute("/cookies")).toBe(true);
    expect(isPublicRoute("/help")).toBe(true);
  });

  it("rejects unknown routes", () => {
    expect(isPublicRoute("/dashboard")).toBe(false);
    expect(isPublicRoute("/dashboard/notes")).toBe(false);
  });
});
