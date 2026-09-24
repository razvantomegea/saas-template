import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/better-auth/server";
import {
  createAuthCorsPreflightResponse,
  withAuthCors,
} from "@/lib/better-auth/cors";

export const dynamic = "force-dynamic";

const { GET: baseGet, POST: basePost } = toNextJsHandler(auth);

export async function OPTIONS(request: Request) {
  return (
    createAuthCorsPreflightResponse(request) ??
    new Response(null, { status: 403 })
  );
}

export async function GET(request: Request) {
  const response = await baseGet(request);
  return withAuthCors(request, response);
}

export async function POST(request: Request) {
  const response = await basePost(request);
  return withAuthCors(request, response);
}
