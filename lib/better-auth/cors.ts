import { isTrustedOrigin } from "@/lib/better-auth/trusted-origins";

const CORS_METHODS = "GET, POST, OPTIONS";
const CORS_CREDENTIALS = "true";

type CorsRequest = {
  headers: {
    get(name: string): string | null;
  };
  method: string;
};

function buildCorsHeaders(request: CorsRequest, origin: string): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": CORS_METHODS,
    "Access-Control-Allow-Credentials": CORS_CREDENTIALS,
    Vary: "Origin",
  };

  const requestedHeaders = request.headers.get(
    "Access-Control-Request-Headers",
  );
  headers["Access-Control-Allow-Headers"] =
    requestedHeaders ?? "Content-Type, Authorization, Cookie";

  return headers;
}

function mergeVaryHeader(existing: string | null, addition: string): string {
  if (!existing) {
    return addition;
  }

  const parts = existing.split(",").map((part) => part.trim().toLowerCase());
  if (parts.includes(addition.toLowerCase())) {
    return existing;
  }

  return `${existing}, ${addition}`;
}

function copyResponseHeaders(source: Headers, target: Headers): void {
  source.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      return;
    }
    target.append(key, value);
  });

  if (typeof source.getSetCookie === "function") {
    for (const cookie of source.getSetCookie()) {
      target.append("set-cookie", cookie);
    }
    return;
  }

  const fallback = source.get("set-cookie");
  if (fallback) {
    target.append("set-cookie", fallback);
  }
}

export function createAuthCorsPreflightResponse(
  request: CorsRequest,
): Response | null {
  const origin = request.headers.get("origin");
  if (!isTrustedOrigin(origin)) {
    return null;
  }

  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(request, origin),
  });
}

export function withAuthCors(
  request: CorsRequest,
  response: Response,
): Response {
  const origin = request.headers.get("origin");
  if (!isTrustedOrigin(origin)) {
    return response;
  }

  const corsHeaders = buildCorsHeaders(request, origin);
  const headers = new Headers();
  copyResponseHeaders(response.headers, headers);

  for (const [key, value] of Object.entries(corsHeaders)) {
    if (key.toLowerCase() === "vary") {
      headers.set("vary", mergeVaryHeader(headers.get("vary"), value));
      continue;
    }
    headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
