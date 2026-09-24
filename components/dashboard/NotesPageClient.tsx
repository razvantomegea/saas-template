"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PageSkeleton } from "@/components/dashboard/PageSkeleton";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";
import { UNLIMITED_NOTE_LIMIT } from "@/lib/subscription/plan-limits";

type NoteItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export function NotesPageClient() {
  const t = useT();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error(t("notes.loadFailed"));
      }
      return response.json() as Promise<{ notes: NoteItem[]; limit: number }>;
    },
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
        throw new Error(payload.error ?? t("notes.createFailed"));
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
        throw new Error(t("notes.deleteFailed"));
      }
    },
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: ["notes"] }),
    onError: () => toast.error(t("notes.deleteFailed")),
  });

  if (isLoading) {
    return <PageSkeleton className="max-w-3xl" />;
  }

  const notes = data?.notes ?? [];
  const limit = data?.limit ?? 0;
  const atLimit = notes.length >= limit;
  const limitLabel =
    limit >= UNLIMITED_NOTE_LIMIT ? t("common.unlimited") : String(limit);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-100">
          {t("notes.title")}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {t("notes.used", { count: notes.length, limit: limitLabel })}
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
          placeholder={t("notes.titlePlaceholder")}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-emerald-600"
        />
        <textarea
          data-testid={DataTestId.NoteBodyInput}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={t("notes.bodyPlaceholder")}
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
            ? t("notes.limitReached")
            : createNote.isPending
              ? t("common.saving")
              : t("notes.add")}
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
              {t("common.delete")}
            </button>
          </li>
        ))}
        {notes.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("notes.empty")}</p>
        ) : null}
      </ul>
    </div>
  );
}
