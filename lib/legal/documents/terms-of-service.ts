import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_GOVERNING_LAW,
  LEGAL_JURISDICTION_CITY,
  LEGAL_PRODUCT_NAME,
  LEGAL_REFUND_WINDOW_HOURS,
  LEGAL_REGISTERED_ADDRESS,
  LEGAL_TRIAL_DAYS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const termsOfServiceContent: LegalDocumentContent = {
  title: "Terms of Service",
  lastUpdated: "9 June 2026",
  intro: [
    `These Terms of Service ("Terms") govern your use of the ${LEGAL_PRODUCT_NAME} service operated by ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) ("Service"). By creating an account or using the Service, you agree to these Terms.`,
    `If you do not agree, do not use the Service.`,
  ],
  sections: [
    {
      title: "1. Service description",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} is a hosted SaaS product with an authenticated dashboard, subscription billing, and supporting APIs.`,
        "Access to the dashboard and API requires an active account and, for paid features, an active subscription.",
      ],
    },
    {
      title: "2. Contracting party",
      paragraphs: [
        `The Service is provided by ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}. ${LEGAL_PRODUCT_NAME} is our trade name. Contact: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. Eligibility",
      paragraphs: [
        "You must be at least 18 years old and legally able to enter into binding contracts to use the Service. By registering, you represent that you meet these requirements.",
      ],
    },
    {
      title: "4. Account registration",
      paragraphs: [
        "You may register with email and password or, where available, Google sign-in. You are responsible for keeping your login credentials confidential and for all activity under your account.",
      ],
    },
    {
      title: "5. Subscription and billing",
      paragraphs: [
        "Paid plans are billed in EUR on a monthly or annual basis through Stripe. Prices are shown on our pricing page and may change with reasonable notice.",
        `New subscribers receive a ${LEGAL_TRIAL_DAYS}-day free trial on their first paid subscription. After any trial, your payment method is charged automatically unless you cancel before the trial ends.`,
        "Subscriptions renew automatically at the end of each billing period. You may cancel or change your plan through the Billing page, which redirects to the Stripe Customer Portal.",
        "Failure to pay may result in suspension of API access. We do not store your full payment card details — Stripe processes all payments.",
      ],
    },
    {
      title: "6. Refund policy",
      paragraphs: [
        `We offer discretionary refunds for requests received within ${LEGAL_REFUND_WINDOW_HOURS} hours of your first charge (after any free trial ends). To request a refund, email ${LEGAL_CONTACT_EMAIL} from your registered account email with your request and the date of charge.`,
        "Approved refunds are processed via Stripe to your original payment method. Refund requests received after the 24-hour window are generally not accepted under this commercial policy.",
        "This refund policy does not affect any mandatory statutory rights you may have as a consumer under applicable law.",
      ],
    },
    {
      title: "7. Right of withdrawal (EU and Romania consumers)",
      paragraphs: [
        "If you are a consumer in the European Union or Romania, you generally have a 14-day right of withdrawal from distance contracts without giving a reason, under Directive 2011/83/EU and Romanian Government Emergency Ordinance No. 34/2014 (OUG 34/2014).",
        "For digital services where performance begins immediately, you may lose the right of withdrawal if you expressly consent to immediate access and acknowledge that you will lose your withdrawal right once the service has started. This consent may be obtained during checkout or account activation.",
        "To exercise your statutory right of withdrawal, send a clear statement to " +
          LEGAL_CONTACT_EMAIL +
          " before the withdrawal period expires. If you validly withdraw, we will reimburse payments received without undue delay and in any event within 14 days.",
        "For complaints about consumer rights, you may contact the Romanian National Authority for Consumer Protection (ANPC) at anpc.ro.",
      ],
    },
    {
      title: "8. Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Share your account credentials with unauthorised parties.",
        "Abuse, overload, or attempt to disrupt the API or infrastructure.",
        "Reverse engineer, scrape, or resell the Service without our written consent.",
        "Use the Service for unlawful activity.",
        "Circumvent subscription limits for your plan tier.",
      ],
    },
    {
      title: "9. Intellectual property",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, our website, dashboard, and API are owned by ${LEGAL_COMPANY_NAME} or its licensors.`,
        "You receive a limited, non-exclusive, non-transferable licence to use the Service for your personal or internal business purposes while your subscription is active.",
      ],
    },
    {
      title: "10. Third-party services",
      paragraphs: [
        "The Service integrates with Stripe and other third parties. We are not responsible for outages, policy changes, or failures of third-party platforms.",
      ],
    },
    {
      title: "11. No professional advice",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} is software infrastructure. It does not provide financial, legal, or other professional advice or recommendations.`,
        "You are solely responsible for your use of the Service and compliance with applicable regulations. Use the Service at your own risk.",
      ],
    },
    {
      title: "12. Service availability",
      paragraphs: [
        "We aim to keep the Service available but do not guarantee uninterrupted or error-free operation. Maintenance, infrastructure issues, or third-party failures may cause downtime. No service-level agreement applies unless expressly agreed in writing.",
      ],
    },
    {
      title: "13. Limitation of liability",
      paragraphs: [
        `To the maximum extent permitted by applicable law, ${LEGAL_COMPANY_NAME} shall not be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits or lost data arising from use of the Service.`,
        `Our total aggregate liability for any claims arising from these Terms or the Service is limited to the fees you paid to us in the twelve (12) months preceding the claim. Nothing in these Terms limits liability that cannot be limited under mandatory consumer protection law.`,
      ],
    },
    {
      title: "14. Termination",
      paragraphs: [
        "You may cancel your subscription at any time via the Billing page. We may suspend or terminate your account if you breach these Terms or if required by law. Upon termination, your API access ends and we may delete your data in accordance with our Privacy Policy.",
      ],
    },
    {
      title: "15. Governing law and disputes",
      paragraphs: [
        `These Terms are governed by the laws of ${LEGAL_GOVERNING_LAW}. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW}, without prejudice to mandatory consumer rights that may allow you to bring proceedings in your country of residence.`,
      ],
    },
    {
      title: "16. Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. Material changes will be posted on this page with an updated date. Continued use after changes constitutes acceptance. For significant changes, we may also notify you by email.",
      ],
    },
    {
      title: "17. Contact",
      paragraphs: [
        `Questions about these Terms: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};
