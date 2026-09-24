import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Privacy Policy",
  lastUpdated: "30 August 2026",
  intro: [
    `This Privacy Policy explains how ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}), operating the ${LEGAL_PRODUCT_NAME} service ("we", "us", "our"), collects, uses, stores, and protects your personal data when you use our website and dashboard.`,
    "We process personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable Romanian data protection law.",
  ],
  sections: [
    {
      title: "1. Data controller",
      paragraphs: [
        `The data controller responsible for your personal data is ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, registered address: ${LEGAL_REGISTERED_ADDRESS}.`,
        `${LEGAL_PRODUCT_NAME} is the trade name of our SaaS product. For privacy enquiries or to exercise your rights, contact us at ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "2. What data we collect",
      paragraphs: [
        `We collect only the data necessary to provide the ${LEGAL_PRODUCT_NAME} service:`,
      ],
      bullets: [
        "Account data: name, email address, password hash (if you sign up with email), and profile image (if you sign in with Google).",
        "Session data: authentication cookies, session tokens, and optionally your IP address and browser user-agent when you use the web dashboard.",
        "Subscription data: plan tier, subscription status, and Stripe customer identifier. Payment card details are collected and stored by Stripe, not by us.",
        "Application data: the data you create in the product while using our features, such as records and settings you save in your dashboard.",
        "Onboarding data: whether you have completed the setup wizard.",
        "Support data: if you submit the private Help form, we store your email, message category, subject, and message body, and we may link the ticket to your account when you are signed in. Temporary IP-based rate-limit counters may be held in application memory to prevent abuse.",
        "Help bot messages: if you use the optional Help chat, your prompts and the model replies are sent to the AI provider described in section 5 so we can answer from our public FAQ. Do not paste passwords or full secrets into the chat.",
      ],
    },
    {
      title: "3. How we use your data and legal bases",
      paragraphs: [
        "We process your personal data for the following purposes and on the following legal bases under GDPR Article 6:",
      ],
      bullets: [
        "Providing your account and dashboard — performance of our contract with you (Art. 6(1)(b)).",
        "Processing subscriptions and billing via Stripe — performance of contract and legal obligation for financial records (Art. 6(1)(b) and (c)).",
        "Securing the service, preventing abuse, and protecting API access — legitimate interest (Art. 6(1)(f)).",
        "Sending transactional authentication emails (such as password-reset links) — performance of contract and legitimate interest in account security (Art. 6(1)(b) and (f)).",
        "Google OAuth sign-in (if you choose it) — your consent at sign-in (Art. 6(1)(a)).",
        "Responding to support requests (email, private Help form, or Help bot) and legal enquiries — legitimate interest or legal obligation, as applicable.",
      ],
    },
    {
      title: "4. Cookies",
      paragraphs: [
        `We use strictly necessary session cookies to keep you logged in to the ${LEGAL_PRODUCT_NAME} dashboard. These cookies are essential for the service and do not require consent under the ePrivacy Directive.`,
        "On your first visit, we show a cookie preferences banner. Analytics (Cloudflare Web Analytics and anonymous funnel events) loads only if you choose Accept all or enable Analytics in Cookie settings. This is a cookieless, aggregate analytics service that does not identify individual users and does not use advertising or third-party tracking cookies.",
        "You can change your choice at any time using Cookie settings in the site footer.",
        "We do not use advertising or third-party tracking cookies. If we introduce other non-essential cookies in the future, we will update this policy and request your consent where required.",
      ],
    },
    {
      title: "5. Third-party processors",
      paragraphs: [
        "We share personal data with trusted processors who help us operate the service. Each processor processes data only on our instructions and under appropriate data protection agreements:",
      ],
      bullets: [
        "Stripe — payment processing and subscription billing (stripe.com/privacy). Stripe acts as an independent controller for payment data it collects directly.",
        "Supabase — managed PostgreSQL database hosting for account and application data.",
        "Vercel — application hosting and infrastructure.",
        "Google — OAuth authentication, only if you choose to sign in with Google (policies.google.com/privacy).",
        "Resend — transactional emails for password reset and account-deletion confirmation, containing your account email address and a time-limited link (resend.com/legal/privacy-policy).",
        "Google Gemini API (Google AI Studio / Gemini Developer API) — optional Help bot answers grounded on our public FAQ. When the Help bot is enabled, chat messages are sent to Google to generate replies. Free-tier Gemini API usage may be used by Google to improve its products according to Google's terms; do not send sensitive secrets in Help chat. Paid or higher-tier configurations may offer different data terms — we will update this policy if our production tier changes.",
        "Cloudflare — cookieless Web Analytics on marketing pages when enabled, and CDN/security services.",
        "GitHub — only if you voluntarily post a public issue; content you publish there is public and subject to GitHub's terms, not our private support queue.",
      ],
    },
    {
      title: "6. International data transfers",
      paragraphs: [
        "Some of our processors may store or process data outside the European Economic Area (EEA), including in the United States. Where such transfers occur, we rely on appropriate safeguards such as the EU Standard Contractual Clauses and the processor's compliance with applicable data protection frameworks.",
      ],
    },
    {
      title: "7. Data retention",
      paragraphs: [
        "We retain your data only as long as necessary for the purposes described in this policy:",
      ],
      bullets: [
        "Account and profile data: retained while your account is active and for a reasonable period after deletion request or account closure, unless a longer period is required by law.",
        "Application data: retained while your account is active to power your dashboard. You may remove individual records or clear your application data from the dashboard; that immediately deletes the related rows.",
        "Session data: retained until the session expires or you log out.",
        "Billing records: retained as required by applicable tax and accounting law, in line with Stripe's retention practices.",
        "Private support tickets: retained while useful to resolve your request and for a reasonable period afterward for abuse prevention and service quality, then deleted or anonymised, unless a longer period is required by law. Account erasure requests may include open support tickets linked to your user id.",
        "Help bot chats: not stored as a permanent ticket history in our database; messages are processed to generate a reply and may be handled by the AI processor under its retention rules for the API tier in use.",
      ],
    },
    {
      title: "8. Your rights under GDPR",
      paragraphs: [
        "If you are in the EEA or UK, you have the following rights regarding your personal data:",
      ],
      bullets: [
        "Right of access — request a copy of the personal data we hold about you.",
        "Right to rectification — request correction of inaccurate data.",
        "Right to erasure — request deletion of your data, subject to legal retention obligations.",
        "Right to restriction — request that we limit how we use your data in certain circumstances.",
        "Right to data portability — receive your data in a structured, machine-readable format where technically feasible.",
        "Right to object — object to processing based on legitimate interests.",
        "Right to withdraw consent — where processing is based on consent, you may withdraw it at any time without affecting prior lawful processing.",
        "Right to lodge a complaint — with the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP) at dataprotection.ro, or your local supervisory authority.",
      ],
    },
    {
      title: "9. How to exercise your rights",
      paragraphs: [
        `To exercise any of the rights above, email us at ${LEGAL_CONTACT_EMAIL} from the email address associated with your account. We will respond within one month, as required by GDPR. We may need to verify your identity before processing your request.`,
        "You can permanently delete your account from Dashboard → Settings. Deletion cancels all active subscriptions and removes associated account data. You may also email us to request erasure.",
      ],
    },
    {
      title: "10. Security",
      paragraphs: [
        "We implement technical and organisational measures to protect your data, including HTTPS encryption, password hashing, and access controls scoped to your user account. Private support tickets are visible only to authorised operators.",
      ],
    },
    {
      title: "11. Children",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} is not directed at children under 16. We do not knowingly collect personal data from anyone under 16. If you believe a child has provided us data, contact us and we will delete it.`,
      ],
    },
    {
      title: "12. No professional advice",
      paragraphs: [
        `Content and data displayed in the dashboard are operational information about your own use of ${LEGAL_PRODUCT_NAME}. Nothing in the Service constitutes financial, legal, or other professional advice. The optional Help bot may be inaccurate; use the private support form or email for account-specific issues.`,
      ],
    },
    {
      title: "13. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated date. Continued use of the service after changes constitutes acceptance of the updated policy.",
      ],
    },
    {
      title: "14. Contact",
      paragraphs: [
        `For privacy questions or data subject requests: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
