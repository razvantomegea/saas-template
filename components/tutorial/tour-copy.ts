export const TUTORIAL_SLIDE_KEYS = ["welcome", "notes", "notify"] as const;

export type TutorialSlideKey = (typeof TUTORIAL_SLIDE_KEYS)[number];

/** Keys match `data-tour="<key>"` attributes on dashboard nav items. */
export const TUTORIAL_SPOTLIGHT_KEYS = [
  "nav-home",
  "nav-notes",
  "nav-settings",
  "nav-billing",
] as const;

export type TutorialSpotlightKey = (typeof TUTORIAL_SPOTLIGHT_KEYS)[number];

export const TUTORIAL_SLIDES: Record<
  TutorialSlideKey,
  { title: string; body: string }
> = {
  welcome: {
    title: "Welcome to SaaS Template",
    body: "A Next.js starter with auth, billing, and a working demo feature — Notes — so you can see everything wired together.",
  },
  notes: {
    title: "Create and manage notes",
    body: "Notes is the demo feature. It proves your auth and billing gates work end to end before you build the real product.",
  },
  notify: {
    title: "Stay in the loop",
    body: "Enable push notifications from Settings to see how the notification pipeline works.",
  },
};

export const TUTORIAL_SPOTLIGHT: Record<
  TutorialSpotlightKey,
  { title: string; body: string }
> = {
  "nav-home": {
    title: "Home",
    body: "Your dashboard overview lives here.",
  },
  "nav-notes": {
    title: "Notes",
    body: "Create, edit, and delete notes — the demo feature for this template.",
  },
  "nav-settings": {
    title: "Settings",
    body: "Manage your account and notification preferences.",
  },
  "nav-billing": {
    title: "Billing",
    body: "Upgrade your plan or manage your subscription via the Stripe customer portal.",
  },
};
