import { ApiError } from "@/lib/api-error";

export function dashboardRouteErrorResponse(params: {
  error: unknown;
  logLabel: string;
  fallbackMessage: string;
}): Response {
  if (params.error instanceof ApiError) {
    return Response.json(
      { error: params.error.message },
      { status: params.error.status },
    );
  }

  if (
    params.error instanceof Error &&
    params.error.message === "Unauthorized"
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.error(params.logLabel, params.error);
  return Response.json({ error: params.fallbackMessage }, { status: 500 });
}
