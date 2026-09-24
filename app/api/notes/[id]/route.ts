import { z } from "zod";
import { assertDashboardSession } from "@/lib/dashboard/session";
import { dashboardRouteErrorResponse } from "@/lib/dashboard/route-error";
import { deleteNote, updateNote } from "@/lib/notes/queries";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const updateNoteSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  body: z.string().trim().max(5000).optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  try {
    const { session } = await assertDashboardSession();
    const { id } = await params;
    const body = await request.json().catch(() => null);
    const parsed = updateNoteSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid note payload" }, { status: 400 });
    }

    const note = await updateNote({
      id,
      userId: session.user.id,
      title: parsed.data.title,
      body: parsed.data.body,
    });

    return Response.json({
      id: note.id,
      title: note.title,
      body: note.body,
      createdAt: note.createdAt.toISOString(),
    });
  } catch (error) {
    return dashboardRouteErrorResponse({
      error,
      logLabel: "[PATCH /api/notes/:id]",
      fallbackMessage: "Failed to update note",
    });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  try {
    const { session } = await assertDashboardSession();
    const { id } = await params;
    await deleteNote({ id, userId: session.user.id });
    return Response.json({ ok: true });
  } catch (error) {
    return dashboardRouteErrorResponse({
      error,
      logLabel: "[DELETE /api/notes/:id]",
      fallbackMessage: "Failed to delete note",
    });
  }
}
