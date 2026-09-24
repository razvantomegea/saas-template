import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";

type SessionResponse = {
  user?: { id: string };
} | null;

/** Cookie-presence check only — proxy cannot verify signatures at the edge. */
export function getMiddlewareSession(request: NextRequest): SessionResponse {
  if (!getSessionCookie(request)) {
    return null;
  }

  return { user: { id: "cookie-present" } };
}
