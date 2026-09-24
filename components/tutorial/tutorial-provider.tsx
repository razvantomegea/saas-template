"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { IntroSlider } from "@/components/tutorial/intro-slider";
import { SpotlightTour } from "@/components/tutorial/spotlight-tour";
import {
  readTutorialCompleted,
  writeTutorialCompleted,
} from "@/lib/tutorial/storage";

type TutorialPhase = "idle" | "slider" | "spotlight";

type TutorialContextValue = {
  phase: TutorialPhase;
  startTour: () => void;
  skipOrFinish: () => void;
  goToSpotlight: () => void;
};

const TutorialContext = createContext<TutorialContextValue | null>(null);

const TUTORIAL_CHANGE_EVENT = "saas-template-tutorial-change";

function subscribeTutorialStorage(onStoreChange: () => void) {
  window.addEventListener(TUTORIAL_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(TUTORIAL_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getTutorialCompletedSnapshot(): boolean {
  return readTutorialCompleted(localStorage);
}

function getServerTutorialCompletedSnapshot(): boolean {
  return true;
}

function notifyTutorialStorage() {
  window.dispatchEvent(new Event(TUTORIAL_CHANGE_EVENT));
}

export function useTutorial(): TutorialContextValue {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorial must be used within TutorialProvider");
  }
  return context;
}

export function TutorialProvider({ children }: { children: ReactNode }) {
  const completed = useSyncExternalStore(
    subscribeTutorialStorage,
    getTutorialCompletedSnapshot,
    getServerTutorialCompletedSnapshot,
  );
  const [sessionPhase, setSessionPhase] = useState<TutorialPhase | null>(null);

  const phase: TutorialPhase = sessionPhase ?? (completed ? "idle" : "slider");

  const skipOrFinish = useCallback(() => {
    writeTutorialCompleted(localStorage);
    notifyTutorialStorage();
    setSessionPhase("idle");
  }, []);

  const goToSpotlight = useCallback(() => {
    setSessionPhase("spotlight");
  }, []);

  const startTour = useCallback(() => {
    setSessionPhase("slider");
  }, []);

  const value = useMemo(
    () => ({ phase, startTour, skipOrFinish, goToSpotlight }),
    [phase, startTour, skipOrFinish, goToSpotlight],
  );

  return (
    <TutorialContext.Provider value={value}>
      {children}
      {phase === "slider" ? (
        <IntroSlider onDone={goToSpotlight} onSkip={skipOrFinish} />
      ) : null}
      {phase === "spotlight" ? (
        <SpotlightTour onFinish={skipOrFinish} onSkip={skipOrFinish} />
      ) : null}
    </TutorialContext.Provider>
  );
}
