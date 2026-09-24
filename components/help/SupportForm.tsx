"use client";

import { useMemo, useState, type FormEvent } from "react";

import { useT } from "@/components/i18n/LocaleProvider";
import { Select, controlFieldClassName } from "@/components/ui/Select";
import { SUPPORT_CATEGORIES, type SupportCategory } from "@/lib/help/constants";
import { DataTestId } from "@/lib/constants/data-test-id";
import { notify } from "@/lib/notify";

const CATEGORY_LABEL_KEYS: Record<SupportCategory, string> = {
  bug: "help.categoryBug",
  billing: "help.categoryBilling",
  question: "help.categoryQuestion",
  other: "help.categoryOther",
};

type SupportFormProps = {
  defaultEmail?: string;
};

export function SupportForm({ defaultEmail = "" }: SupportFormProps) {
  const t = useT();
  const [category, setCategory] = useState<SupportCategory>("question");
  const [email, setEmail] = useState(defaultEmail);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const categoryOptions = useMemo(
    () =>
      SUPPORT_CATEGORIES.map((value) => ({
        value,
        label: t(CATEGORY_LABEL_KEYS[value]),
      })),
    [t],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setSubmittedId(null);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, email, subject, body }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? t("help.submitError"));
      }
      setSubmittedId(data.id ?? "ok");
      setSubject("");
      setBody("");
      notify.success(t("help.submitNotifySuccess"));
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : t("help.submitError"),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid={DataTestId.HelpSupportForm}
      className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-5"
    >
      <div className="space-y-1">
        <label htmlFor="support-category" className="text-sm text-zinc-300">
          {t("help.category")}
        </label>
        <Select
          id="support-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as SupportCategory)}
          options={categoryOptions}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="support-email" className="text-sm text-zinc-300">
          {t("help.email")}
        </label>
        <input
          id="support-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`h-10 px-3 ${controlFieldClassName}`}
          autoComplete="email"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="support-subject" className="text-sm text-zinc-300">
          {t("help.subject")}
        </label>
        <input
          id="support-subject"
          type="text"
          required
          minLength={3}
          maxLength={200}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`h-10 px-3 ${controlFieldClassName}`}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="support-body" className="text-sm text-zinc-300">
          {t("help.details")}
        </label>
        <textarea
          id="support-body"
          required
          minLength={10}
          maxLength={8000}
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t("help.detailsPlaceholder")}
          className={`px-3 py-2 ${controlFieldClassName}`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        data-testid={DataTestId.HelpSupportSubmit}
        className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
      >
        {submitting ? t("help.submitting") : t("help.submitRequest")}
      </button>

      {submittedId ? (
        <p
          data-testid={DataTestId.HelpSupportSuccess}
          className="text-sm text-emerald-400"
        >
          {submittedId !== "ok"
            ? t("help.submitSuccessWithId", {
                id: submittedId.slice(0, 8),
              })
            : t("help.submitSuccess")}
        </p>
      ) : null}
    </form>
  );
}
