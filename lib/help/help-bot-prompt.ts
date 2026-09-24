import { formatFaqForPrompt } from "@/lib/docs/faq-content";
import type { AppLocale } from "@/lib/i18n/locales";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { LEGAL_CONTACT_EMAIL, LEGAL_PRODUCT_NAME } from "@/lib/legal/constants";

export function buildHelpBotSystemPrompt(
  locale: AppLocale = DEFAULT_LOCALE,
): string {
  return [
    `You are the ${LEGAL_PRODUCT_NAME} Help assistant.`,
    "Answer ONLY using the FAQ and product facts below.",
    "If the answer is not clearly covered, say you are not sure and tell the user to use the private support form on /help or email " +
      LEGAL_CONTACT_EMAIL +
      ".",
    "Never invent billing, refund, or legal policy details beyond the FAQ.",
    "Never ask for passwords, Stripe card numbers, or full webhook secrets.",
    "Keep answers concise and practical.",
    `Always answer in the visitor's language (locale: ${locale}).`,
    "",
    "=== FAQ ===",
    formatFaqForPrompt(locale),
  ].join("\n");
}
