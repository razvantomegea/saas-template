"use client";

import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";
import type { LegalDocumentContent } from "@/lib/legal/types";

type LegalDocumentProps = {
  content: LegalDocumentContent;
  titleTestId?: string;
  disclaimer?: string;
};

/**
 * Lowercase slug: drop parenthetical asides, non-alphanumeric → `-`, collapse
 * dashes, trim edges. E.g. "7. Right of withdrawal (EU and Romania
 * consumers)" → "7-right-of-withdrawal".
 */
function slugifySectionTitle(title: string): string {
  return title
    .replace(/\([^)]*\)/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function LegalDocument({
  content,
  titleTestId,
  disclaimer,
}: LegalDocumentProps) {
  const t = useT();

  return (
    <article className="space-y-8 text-zinc-300">
      <header className="space-y-3 border-b border-zinc-800 pb-8">
        <h1
          data-testid={titleTestId}
          className="text-3xl font-semibold tracking-tight text-zinc-100"
        >
          {content.title}
        </h1>
        <p className="text-sm text-zinc-500">
          {t("legal.lastUpdated")}: {content.lastUpdated}
        </p>
        {disclaimer ? (
          <p
            className="text-sm text-amber-200/80"
            data-testid={DataTestId.PrivacyDisclaimer}
          >
            {disclaimer}
          </p>
        ) : null}
        {content.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-zinc-400">
            {paragraph}
          </p>
        ))}
      </header>

      {content.sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2
            className="text-lg font-medium text-zinc-100"
            data-testid={DataTestId.LegalSectionHeading(
              slugifySectionTitle(section.title),
            )}
          >
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
          {section.bullets ? (
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {section.bullets.map((bullet) => (
                <li key={bullet.slice(0, 48)}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
