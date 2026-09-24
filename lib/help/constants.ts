/** Public Help / FAQ hub. */
export const HELP_PATH = "/help" as const;

export const SUPPORT_CATEGORIES = [
  "bug",
  "billing",
  "question",
  "other",
] as const;

export type SupportCategory = (typeof SUPPORT_CATEGORIES)[number];

export const SUPPORT_CATEGORY_LABELS: Record<SupportCategory, string> = {
  bug: "Bug report",
  billing: "Billing / subscription",
  question: "Question",
  other: "Other",
};

/**
 * Public GitHub Issues URL for product bugs / feature requests.
 * Set `NEXT_PUBLIC_GITHUB_FEEDBACK_URL` to a public repo Issues page
 * (ea-sync may stay private — use a dedicated feedback repo if needed).
 */
export function resolveGithubFeedbackUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_GITHUB_FEEDBACK_URL?.trim();
  if (!raw) {
    return null;
  }
  return raw.replace(/\/+$/, "");
}

export function resolveGithubNewIssueUrl(): string | null {
  const base = resolveGithubFeedbackUrl();
  if (!base) {
    return null;
  }
  if (base.includes("/issues/new")) {
    return base;
  }
  return `${base}/new/choose`;
}
