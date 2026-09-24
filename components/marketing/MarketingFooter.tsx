"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import { formatAppVersion } from "@/lib/app-version";
import { useOptionalCookieConsent } from "@/lib/analytics/cookie-consent-context";
import { DataTestId } from "@/lib/constants/data-test-id";
import { HELP_PATH } from "@/lib/help/constants";
import {
  LEGAL_COMPANY_NAME,
  LEGAL_COMPANY_WEBSITE,
  LEGAL_CONTACT_EMAIL,
  LEGAL_COOKIES_PATH,
  LEGAL_PRIVACY_PATH,
  LEGAL_TERMS_PATH,
} from "@/lib/legal/constants";

export function MarketingFooter() {
  const cookieConsent = useOptionalCookieConsent();
  const t = useT();

  return (
    <footer
      className="mt-auto border-t border-zinc-800/80 bg-zinc-950/80"
      data-testid={DataTestId.MarketingFooter}
    >
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-zinc-500 sm:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <LocalizedLink
            href={LEGAL_PRIVACY_PATH}
            data-testid={DataTestId.FooterPrivacyLink}
            className="hover:text-zinc-300"
          >
            {t("footer.privacy")}
          </LocalizedLink>
          <span aria-hidden="true" className="text-zinc-700">
            ·
          </span>
          <LocalizedLink
            href={LEGAL_TERMS_PATH}
            data-testid={DataTestId.FooterTermsLink}
            className="hover:text-zinc-300"
          >
            {t("footer.terms")}
          </LocalizedLink>
          <span aria-hidden="true" className="text-zinc-700">
            ·
          </span>
          <LocalizedLink
            href={LEGAL_COOKIES_PATH}
            data-testid={DataTestId.FooterCookiesLink}
            className="hover:text-zinc-300"
          >
            {t("footer.cookies")}
          </LocalizedLink>
          <span aria-hidden="true" className="text-zinc-700">
            ·
          </span>
          <button
            type="button"
            onClick={() => cookieConsent?.openPreferences()}
            data-testid={DataTestId.FooterCookieSettings}
            className="hover:text-zinc-300"
          >
            {t("footer.cookieSettings")}
          </button>
          <span aria-hidden="true" className="text-zinc-700">
            ·
          </span>
          <LocalizedLink
            href={HELP_PATH}
            data-testid={DataTestId.FooterHelpLink}
            className="hover:text-zinc-300"
          >
            {t("footer.help")}
          </LocalizedLink>
          <span aria-hidden="true" className="text-zinc-700">
            ·
          </span>
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            data-testid={DataTestId.FooterContactLink}
            className="hover:text-zinc-300"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
        </nav>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span data-testid={DataTestId.FooterCopyright}>
            © {new Date().getFullYear()}{" "}
            <a
              href={LEGAL_COMPANY_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={DataTestId.FooterCompanyLink}
              className="hover:text-zinc-300"
            >
              {LEGAL_COMPANY_NAME}
            </a>
            . {t("footer.rightsReserved")}
          </span>
          <span aria-hidden="true" className="text-zinc-700">
            ·
          </span>
          <span
            data-testid={DataTestId.FooterVersion}
            className="font-mono text-[10px] text-zinc-700"
          >
            {formatAppVersion()}
          </span>
        </div>
      </div>
    </footer>
  );
}
