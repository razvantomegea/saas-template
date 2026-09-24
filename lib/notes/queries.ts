import { randomUUID } from "node:crypto";
import { and, count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { notes } from "@/db/schema";
import { ApiError } from "@/lib/api-error";

export type Note = typeof notes.$inferSelect;

export async function listNotesByUserId(userId: string): Promise<Note[]> {
  return db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(desc(notes.createdAt));
}

export async function countNotesByUserId(userId: string): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(notes)
    .where(eq(notes.userId, userId));

  return row?.value ?? 0;
}

export async function createNote(params: {
  userId: string;
  title: string;
  body: string;
  limit: number;
}): Promise<Note> {
  const existingCount = await countNotesByUserId(params.userId);
  if (existingCount >= params.limit) {
    throw new ApiError(
      "Note limit reached for your plan. Upgrade to add more notes.",
      403,
    );
  }

  const [inserted] = await db
    .insert(notes)
    .values({
      id: randomUUID(),
      userId: params.userId,
      title: params.title,
      body: params.body,
    })
    .returning();

  if (!inserted) {
    throw new ApiError("Failed to create note", 500);
  }

  return inserted;
}

export async function updateNote(params: {
  id: string;
  userId: string;
  title?: string;
  body?: string;
}): Promise<Note> {
  const [updated] = await db
    .update(notes)
    .set({
      ...(params.title !== undefined ? { title: params.title } : {}),
      ...(params.body !== undefined ? { body: params.body } : {}),
      updatedAt: new Date(),
    })
    .where(and(eq(notes.id, params.id), eq(notes.userId, params.userId)))
    .returning();

  if (!updated) {
    throw new ApiError("Note not found", 404);
  }

  return updated;
}

export async function deleteNote(params: {
  id: string;
  userId: string;
}): Promise<void> {
  const deleted = await db
    .delete(notes)
    .where(and(eq(notes.id, params.id), eq(notes.userId, params.userId)))
    .returning({ id: notes.id });

  if (deleted.length === 0) {
    throw new ApiError("Note not found", 404);
  }
}
