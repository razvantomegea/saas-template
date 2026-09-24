import { isTrustedOrigin } from "@/lib/better-auth/trusted-origins";

type HeaderReadable = {
  headers: {
    get(name: string): string | null;
  };
  method?: string;
};

/**
 * True when the request is a same-site browser call from a trusted origin
 * (site URL / localhost / configured Better Auth URL).
 *
 * Prefer Origin, then Referer. Sec-Fetch-Site is browser CSRF context only and
 * is accepted solely for safe (GET/HEAD) requests when Origin/Referer are
 * absent — it is not proof of a trusted origin or sufficient authorization,
 * because non-browser clients can forge it. Mutating requests must present
 * Origin or Referer. Raw HTTP clients without these headers are rejected.
 */
export function isRequestFromTrustedOrigin(request: HeaderReadable): boolean {
  const origin = request.headers.get("origin");
  if (origin) {
    return isTrustedOrigin(origin);
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return isTrustedOrigin(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  if (request.headers.get("sec-fetch-site") !== "same-origin") {
    return false;
  }
  const method = (request.method ?? "GET").toUpperCase();
  return method === "GET" || method === "HEAD";
}

/** Returns a 403 Response when the request is not from a trusted origin. */
export function requireTrustedOrigin(request: HeaderReadable): Response | null {
  if (isRequestFromTrustedOrigin(request)) {
    return null;
  }

  return Response.json({ error: "Forbidden" }, { status: 403 });
}
