"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PageSkeleton } from "@/components/dashboard/PageSkeleton";
import { DataTestId } from "@/lib/constants/data-test-id";
import { UNLIMITED_NOTE_LIMIT } from "@/lib/subscription/plan-limits";

type NoteItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

async function fetchNotes(): Promise<{ notes: NoteItem[]; limit: number }> {
  const response = await fetch("/api/notes");
  if (!response.ok) {
    throw new Error("Failed to load notes");
  }
  return response.json();
}

export function NotesPageClient() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const createNote = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? "Failed to create note");
      }
      return response.json();
    },
    onSuccess: () => {
      setTitle("");
      setBody("");
      void queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteNote = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
    },
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: ["notes"] }),
    onError: () => toast.error("Failed to delete note"),
  });

  if (isLoading) {
    return <PageSkeleton className="max-w-3xl" />;
  }

  const notes = data?.notes ?? [];
  const limit = data?.limit ?? 0;
  const atLimit = notes.length >= limit;
  const limitLabel = limit >= UNLIMITED_NOTE_LIMIT ? "unlimited" : limit;

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-100">Notes</h1>
        <p className="mt-2 text-sm text-zinc-400">
          {notes.length} of {limitLabel} notes used.
        </p>
      </header>

      <form
        data-testid={DataTestId.NoteCreateForm}
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim() || atLimit) return;
          createNote.mutate();
        }}
        className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
      >
        <input
          data-testid={DataTestId.NoteTitleInput}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-emerald-600"
        />
        <textarea
          data-testid={DataTestId.NoteBodyInput}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write something…"
          rows={3}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-emerald-600"
        />
        <button
          type="submit"
          data-testid={DataTestId.NoteSubmitButton}
          disabled={createNote.isPending || !title.trim() || atLimit}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          {atLimit
            ? "Note limit reached"
            : createNote.isPending
              ? "Saving…"
              : "Add note"}
        </button>
      </form>

      <ul data-testid={DataTestId.NotesList} className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            data-testid={DataTestId.NoteItem}
            className="flex items-start justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <div>
              <p className="font-medium text-zinc-100">{note.title}</p>
              {note.body ? (
                <p className="mt-1 text-sm text-zinc-400">{note.body}</p>
              ) : null}
            </div>
            <button
              type="button"
              data-testid={DataTestId.NoteDeleteButton}
              onClick={() => deleteNote.mutate(note.id)}
              className="shrink-0 text-sm text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </li>
        ))}
        {notes.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No notes yet — create your first one above.
          </p>
        ) : null}
      </ul>
    </div>
  );
}
