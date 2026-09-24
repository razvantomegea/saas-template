import { NextRequest } from "next/server";

/**
 * Rate-limit identity from ingress-controlled headers only.
 *
 * Prefer CF-Connecting-IP when present (Cloudflare → origin). Otherwise use
 * Railway's X-Real-IP (edge-overwritten). Never trust client-controlled
 * X-Forwarded-For.
 */
export function clientIpFromRequest(req: NextRequest): string {
  const cfConnectingIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}
