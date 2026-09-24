import { z } from "zod";
import { assertDashboardSession } from "@/lib/dashboard/session";
import { dashboardRouteErrorResponse } from "@/lib/dashboard/route-error";
import { createNote, listNotesByUserId } from "@/lib/notes/queries";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";
import { resolveEntitlements } from "@/lib/subscription/entitlements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createNoteSchema = z.object({
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().max(5000).optional().default(""),
});

export async function GET(request: Request) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  try {
    const { session, profile } = await assertDashboardSession();
    const notes = await listNotesByUserId(session.user.id);
    const entitlements = resolveEntitlements(profile);

    return Response.json({
      notes: notes.map((note) => ({
        id: note.id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt.toISOString(),
      })),
      limit: entitlements.noteLimit,
    });
  } catch (error) {
    return dashboardRouteErrorResponse({
      error,
      logLabel: "[GET /api/notes]",
      fallbackMessage: "Failed to fetch notes",
    });
  }
}

export async function POST(request: Request) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  try {
    const { session, profile } = await assertDashboardSession();
    const body = await request.json().catch(() => null);
    const parsed = createNoteSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid note payload" }, { status: 400 });
    }

    const entitlements = resolveEntitlements(profile);
    const note = await createNote({
      userId: session.user.id,
      title: parsed.data.title,
      body: parsed.data.body,
      limit: entitlements.noteLimit,
    });

    return Response.json(
      {
        id: note.id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt.toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    return dashboardRouteErrorResponse({
      error,
      logLabel: "[POST /api/notes]",
      fallbackMessage: "Failed to create note",
    });
  }
}
