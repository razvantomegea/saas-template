import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_PRODUCT_NAME,
  LEGAL_REFUND_WINDOW_HOURS,
  LEGAL_TRIAL_DAYS,
} from "@/lib/legal/constants";
import type { FaqSection } from "@/lib/i18n/faq/types";

export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        id: "what-is-this",
        question: `What is ${LEGAL_PRODUCT_NAME}?`,
        answer: `${LEGAL_PRODUCT_NAME} is a SaaS starter with authentication, billing, and a dashboard already wired up, so you can focus on your product instead of boilerplate.`,
      },
      {
        id: "sign-up",
        question: "How do I sign up?",
        answer:
          "Click Start free trial, create an account with email and password or Google sign-in, then follow the on-screen steps to pick a plan.",
      },
      {
        id: "dashboard-location",
        question: "Where is my dashboard?",
        answer:
          "Once you are signed in, open Dashboard from the top navigation. Settings, billing, and your account data all live under Dashboard.",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & plans",
    items: [
      {
        id: "trial",
        question: "Is there a free trial?",
        answer: `Yes. New subscribers get a ${LEGAL_TRIAL_DAYS}-day free trial on their first paid subscription. Your payment method is charged automatically once the trial ends unless you cancel first.`,
      },
      {
        id: "plans",
        question: "What plans are available?",
        answer:
          "Plans and pricing are shown on the Pricing page. Checkout and recurring billing are handled by Stripe, so we never store your full card details.",
      },
      {
        id: "manage-subscription",
        question: "How do I manage or cancel my subscription?",
        answer:
          "Open Dashboard → Billing and use Manage subscription to open the Stripe Customer Portal. From there you can change plans, update your payment method, or cancel.",
      },
      {
        id: "refunds",
        question: "What is the refund policy?",
        answer: `We offer discretionary refunds for requests received within ${LEGAL_REFUND_WINDOW_HOURS} hours of your first charge. Email ${LEGAL_CONTACT_EMAIL} from your registered account email. This does not affect any mandatory consumer rights under applicable law. Full details are in the Terms of Service.`,
      },
    ],
  },
  {
    id: "account",
    title: "Account",
    items: [
      {
        id: "password-reset",
        question: "How do I reset my password?",
        answer:
          "On the login page, click Forgot password and follow the emailed link to set a new password.",
      },
      {
        id: "google-oauth",
        question: "Can I sign in with Google?",
        answer:
          "Yes. Choose Continue with Google on the login or signup page. Your account is linked automatically by email address.",
      },
      {
        id: "delete-account",
        question: "How do I delete my account?",
        answer:
          "Open Dashboard → Settings → Danger zone → Delete account. Confirm by typing DELETE (and your password, if you signed up with email). This permanently deletes your account data and cancels any active subscription.",
      },
    ],
  },
  {
    id: "cookies-privacy",
    title: "Cookies & privacy",
    items: [
      {
        id: "cookie-banner",
        question: "Why do I see a cookie banner?",
        answer:
          "On your first visit we show a cookie preferences banner. Strictly necessary session cookies always apply so you can stay logged in; you choose whether to allow anything else.",
      },
      {
        id: "analytics-consent",
        question: "When does analytics load?",
        answer:
          "Analytics only loads after you accept it in the cookie banner or in Cookie settings in the footer. You can change your choice at any time.",
      },
      {
        id: "policies",
        question: "Where can I read the full policies?",
        answer:
          "See /privacy for the Privacy Policy, /terms for the Terms of Service, and /cookies for details on the cookies we use.",
      },
    ],
  },
  {
    id: "notifications-pwa",
    title: "Notifications & app install",
    items: [
      {
        id: "web-push",
        question: "Can I get push notifications?",
        answer:
          "Yes. Enable notifications from Dashboard → Settings to receive web push alerts in your browser, even when the tab is closed.",
      },
      {
        id: "install-pwa",
        question: "Can I install this as an app?",
        answer:
          "Yes. Most browsers show an Install app option in the address bar or menu. Installing adds a shortcut and gives the app a standalone window.",
      },
      {
        id: "in-app-bell",
        question: "Where do I see notifications inside the app?",
        answer:
          "Use the notification bell in the dashboard header to see recent alerts and mark them as read.",
      },
    ],
  },
  {
    id: "help-support",
    title: "Getting help",
    items: [
      {
        id: "faq-scope",
        question: "What does this FAQ cover?",
        answer:
          "This FAQ answers common questions about signing up, billing, your account, and privacy. For anything else, use the support form or email us.",
      },
      {
        id: "help-bot",
        question: "What does the Help bot answer?",
        answer:
          "When configured with an API key, the optional Help bot answers from this FAQ only. It may be unavailable or inaccurate — use the support form or email for anything account-specific or urgent.",
      },
      {
        id: "support-form",
        question: "How do I contact support?",
        answer:
          "Use the private support form on this Help page for account, billing, or anything involving personal data. Include as much detail as you can so we can help quickly.",
      },
      {
        id: "response-time",
        question: "How fast will I get a response?",
        answer: `We aim to respond within one or two business days. For urgent account issues, email ${LEGAL_CONTACT_EMAIL} directly from your registered account email.`,
      },
    ],
  },
];
