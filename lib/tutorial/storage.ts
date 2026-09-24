export const TUTORIAL_COMPLETED_KEY = "saas-template:tutorial-completed";

export function readTutorialCompleted(
  storage: Pick<Storage, "getItem"> | null | undefined,
): boolean {
  if (!storage) {
    return false;
  }
  try {
    return storage.getItem(TUTORIAL_COMPLETED_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeTutorialCompleted(
  storage: Pick<Storage, "setItem"> | null | undefined,
): void {
  if (!storage) {
    return;
  }
  try {
    storage.setItem(TUTORIAL_COMPLETED_KEY, "1");
  } catch {
    // Ignore quota / private mode failures.
  }
}
