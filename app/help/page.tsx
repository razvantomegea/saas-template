import type { Metadata } from "next";

import { HelpChat } from "@/components/help/HelpChat";
import { HelpFaq } from "@/components/help/HelpFaq";
import { SupportForm } from "@/components/help/SupportForm";
import {
  docsBodyClassName,
  docsLinkClassName,
  docsSectionClassName,
  docsSectionTitleClassName,
} from "@/components/docs/docs-classes";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { getServerSession } from "@/lib/better-auth/session";
import { DataTestId } from "@/lib/constants/data-test-id";
import {
  HELP_PATH,
  resolveGithubFeedbackUrl,
  resolveGithubNewIssueUrl,
} from "@/lib/help/constants";
import { createLocalizedPageMetadata } from "@/lib/i18n/metadata";
import { getPageIntl } from "@/lib/i18n/page-intl";
import { LEGAL_CONTACT_EMAIL } from "@/lib/legal/constants";
import { flattenFaqItems, getFaqSections } from "@/lib/docs/faq-content";
import { createBreadcrumbJsonLd, createFaqPageJsonLd } from "@/lib/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getPageIntl();
  const base = createLocalizedPageMetadata({
    locale,
    pathname: HELP_PATH,
    page: "help",
  });
  return {
    ...base,
    title: messages.help.title,
    description: messages.help.subtitle,
    openGraph: {
      ...base.openGraph,
      title: messages.help.title,
      description: messages.help.subtitle,
    },
  };
}

export default async function HelpPage() {
  const { t, messages, locale } = await getPageIntl();
  const faqSections = getFaqSections(locale);
  const session = await getServerSession();
  const githubIssues = resolveGithubFeedbackUrl();
  const githubNewIssue = resolveGithubNewIssueUrl();
  const [privateSupportBeforeEmail, privateSupportAfterEmail = ""] = t(
    "help.privateSupportBody",
    { email: "\u0000" },
  ).split("\u0000");

  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createBreadcrumbJsonLd([
            { name: t("nav.home"), path: "/" },
            { name: messages.help.title, path: HELP_PATH },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createFaqPageJsonLd(flattenFaqItems(faqSections)),
        }}
      />
      <MarketingHeader />
      <main className="mx-auto min-w-0 w-full max-w-3xl px-4 py-16 sm:px-6">
        <header className="space-y-4 border-b border-zinc-800 pb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
            {messages.help.supportHeading}
          </p>
          <h1
            data-testid={DataTestId.HelpTitle}
            className="text-4xl font-semibold tracking-tight text-zinc-100"
          >
            {messages.help.title}
          </h1>
          <p className={docsBodyClassName}>{messages.help.subtitle}</p>
        </header>

        <nav className="mt-8 flex flex-wrap gap-3 text-sm">
          <a href="#faq" className={docsLinkClassName}>
            {t("help.navFaq")}
          </a>
          <a href="#private-support" className={docsLinkClassName}>
            {t("help.navPrivateSupport")}
          </a>
          {githubIssues ? (
            <a href="#public-bugs" className={docsLinkClassName}>
              {t("help.navPublicBugs")}
            </a>
          ) : null}
        </nav>

        <div id="faq" className="mt-12 scroll-mt-24">
          <HelpFaq sections={faqSections} />
        </div>

        <section
          id="private-support"
          className={`mt-14 scroll-mt-24 ${docsSectionClassName}`}
        >
          <h2 className={docsSectionTitleClassName}>
            {t("help.privateSupportTitle")}
          </h2>
          <p className={docsBodyClassName}>
            {privateSupportBeforeEmail}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}`}
              className={docsLinkClassName}
            >
              {LEGAL_CONTACT_EMAIL}
            </a>
            {privateSupportAfterEmail}
          </p>
          <SupportForm defaultEmail={session?.user?.email ?? ""} />
        </section>

        {githubIssues ? (
          <section
            id="public-bugs"
            className={`mt-14 scroll-mt-24 ${docsSectionClassName}`}
          >
            <h2 className={docsSectionTitleClassName}>
              {t("help.publicBugsTitle")}
            </h2>
            <p className={docsBodyClassName}>{t("help.publicBugsBody")}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={githubIssues}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={DataTestId.HelpGithubIssuesLink}
                className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                {t("help.browseIssues")}
              </a>
              {githubNewIssue ? (
                <a
                  href={githubNewIssue}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={DataTestId.HelpGithubNewIssueLink}
                  className="rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white"
                >
                  {t("help.newIssue")}
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        <p className="mt-12 border-t border-zinc-800 pt-8 text-sm text-zinc-500">
          <LocalizedLink href="/" className={docsLinkClassName}>
            {t("help.backHome")}
          </LocalizedLink>
        </p>
      </main>
      <MarketingFooter />
      <HelpChat />
    </div>
  );
}
