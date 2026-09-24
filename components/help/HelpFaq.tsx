"use client";

import { useEffect } from "react";

import {
  docsBodyClassName,
  docsLinkClassName,
  docsSectionClassName,
  docsSectionTitleClassName,
} from "@/components/docs/docs-classes";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import type { FaqSection } from "@/lib/docs/faq-content";
import { FAQ_SECTIONS } from "@/lib/docs/faq-content";
import { DataTestId } from "@/lib/constants/data-test-id";

type HelpFaqProps = {
  sections?: readonly FaqSection[];
  showDocsLink?: boolean;
  testId?: string;
};

function openDetailsMatchingHash(): void {
  if (typeof window === "undefined") {
    return;
  }
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) {
    return;
  }
  const el = document.getElementById(hash);
  if (el instanceof HTMLDetailsElement) {
    el.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function HelpFaq({
  sections = FAQ_SECTIONS,
  showDocsLink = false,
  testId = DataTestId.HelpFaq,
}: HelpFaqProps) {
  const t = useT();

  useEffect(() => {
    openDetailsMatchingHash();
    window.addEventListener("hashchange", openDetailsMatchingHash);
    return () =>
      window.removeEventListener("hashchange", openDetailsMatchingHash);
  }, []);

  return (
    <div data-testid={testId} className="space-y-10">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={docsSectionClassName}
        >
          <h2 className={docsSectionTitleClassName}>{section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <details
                key={item.id}
                id={item.id}
                data-testid={DataTestId.HelpFaqItem(item.id)}
                className="group scroll-mt-24 rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3"
              >
                <summary className="cursor-pointer list-none font-medium text-zinc-100 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span>{item.question}</span>
                    <span className="shrink-0 text-zinc-500 group-open:rotate-180">
                      ▾
                    </span>
                  </span>
                </summary>
                <p className={`mt-3 ${docsBodyClassName}`}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      {showDocsLink ? (
        <p className={docsBodyClassName}>
          {t("help.moreDetailPrefix")}{" "}
          <LocalizedLink
            href="/docs/tradingview-setup"
            className={docsLinkClassName}
            data-testid={DataTestId.HelpFaqDocsLink}
          >
            {t("help.docsLinkText")}
          </LocalizedLink>
          .
        </p>
      ) : null}
    </div>
  );
}
