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

export const TUTORIAL_SLIDE_MESSAGE_KEYS: Record<
  TutorialSlideKey,
  { title: string; body: string }
> = {
  welcome: {
    title: "tutorial.slideWelcomeTitle",
    body: "tutorial.slideWelcomeBody",
  },
  notes: {
    title: "tutorial.slideNotesTitle",
    body: "tutorial.slideNotesBody",
  },
  notify: {
    title: "tutorial.slideNotifyTitle",
    body: "tutorial.slideNotifyBody",
  },
};

export const TUTORIAL_SPOTLIGHT_MESSAGE_KEYS: Record<
  TutorialSpotlightKey,
  { title: string; body: string }
> = {
  "nav-home": {
    title: "tutorial.spotHomeTitle",
    body: "tutorial.spotHomeBody",
  },
  "nav-notes": {
    title: "tutorial.spotNotesTitle",
    body: "tutorial.spotNotesBody",
  },
  "nav-settings": {
    title: "tutorial.spotSettingsTitle",
    body: "tutorial.spotSettingsBody",
  },
  "nav-billing": {
    title: "tutorial.spotBillingTitle",
    body: "tutorial.spotBillingBody",
  },
};
