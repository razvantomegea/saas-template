const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

export type HandleTabTrapParams = {
  container: HTMLElement;
  shiftKey: boolean;
};

/** Returns true when tab focus was redirected (caller should preventDefault). */
export function handleTabTrap({
  container,
  shiftKey,
}: HandleTabTrapParams): boolean {
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    return false;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const current = document.activeElement;

  if (!container.contains(current)) {
    (shiftKey ? last : first).focus();
    return true;
  }

  if (shiftKey && current === first) {
    last.focus();
    return true;
  }

  if (!shiftKey && current === last) {
    first.focus();
    return true;
  }

  return false;
}
