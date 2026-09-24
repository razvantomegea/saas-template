import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_COOKIES_PATH,
  LEGAL_PRIVACY_PATH,
  LEGAL_PRODUCT_NAME,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

/**
 * Cookies Policy — EN authoritative placeholder. Replace before production.
 * Forks should align this with their real analytics stack and consent UX.
 */
export const cookiesPolicyContent: LegalDocumentContent = {
  title: "Cookies Policy",
  lastUpdated: "24 September 2026",
  intro: [
    `This Cookies Policy explains how ${LEGAL_COMPANY_NAME}, operating ${LEGAL_PRODUCT_NAME} ("we", "us", "our"), uses cookies and similar storage on our website and app.`,
    `It should be read together with our Privacy Policy at ${LEGAL_PRIVACY_PATH}. For questions, contact ${LEGAL_CONTACT_EMAIL}.`,
  ],
  sections: [
    {
      title: "1. What are cookies and similar technologies?",
      paragraphs: [
        "Cookies are small text files stored on your device. We also use browser localStorage for preferences that are not sent to the server on every request (for example theme and cookie-consent choices).",
      ],
    },
    {
      title: "2. Essential cookies and storage",
      paragraphs: [
        "These are required to operate the service and do not require consent under the ePrivacy Directive where applicable:",
      ],
      bullets: [
        "Authentication / session cookies used by Better Auth so you stay signed in.",
        "Security-related cookies needed to protect accounts and forms.",
        "localStorage keys for theme preference (system / light / dark) and cookie-consent choices after you decide.",
      ],
    },
    {
      title: "3. Analytics and non-essential technologies",
      paragraphs: [
        "On your first visit we show a cookie preferences banner. Analytics and other non-essential scripts (for example Vercel Analytics / Speed Insights when enabled) load only if you choose Accept all or enable Analytics under Cookie settings.",
        "You can change your choice at any time via Cookie settings in the site footer.",
        "We do not use advertising or third-party tracking cookies in this template by default.",
      ],
    },
    {
      title: "4. How to manage cookies",
      paragraphs: [
        "Use Cookie settings in the footer, or clear site data in your browser. Blocking essential cookies may prevent sign-in and other core features from working.",
      ],
    },
    {
      title: "5. Updates",
      paragraphs: [
        `We may update this Cookies Policy when our practices change. The “last updated” date at the top of this page will change when we do. The canonical path for this document is ${LEGAL_COOKIES_PATH}.`,
      ],
    },
  ],
};
