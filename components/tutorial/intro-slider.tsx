"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";
import {
  TUTORIAL_SLIDE_KEYS,
  TUTORIAL_SLIDE_MESSAGE_KEYS,
  type TutorialSlideKey,
} from "@/components/tutorial/tour-copy";

type IntroSliderProps = {
  onSkip: () => void;
  onDone: () => void;
};

export function IntroSlider({ onSkip, onDone }: IntroSliderProps) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const slideKey = TUTORIAL_SLIDE_KEYS[index] as TutorialSlideKey;
  const slide = TUTORIAL_SLIDE_MESSAGE_KEYS[slideKey];
  const isLast = index === TUTORIAL_SLIDE_KEYS.length - 1;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onSkip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSkip]);

  return (
    <div
      aria-labelledby="tutorial-slider-title"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
      data-testid={DataTestId.TutorialSlider}
      role="dialog"
    >
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
        <div aria-hidden="true" className="mb-4 flex gap-1.5">
          {TUTORIAL_SLIDE_KEYS.map((key, i) => (
            <span
              className={`h-1.5 flex-1 rounded-full ${
                i <= index ? "bg-emerald-500" : "bg-zinc-800"
              }`}
              key={key}
            />
          ))}
        </div>
        <h2
          id="tutorial-slider-title"
          className="text-lg font-semibold text-zinc-50"
        >
          {t(slide.title)}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">{t(slide.body)}</p>
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            data-testid={DataTestId.TutorialSkip}
            onClick={onSkip}
            type="button"
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            {t("tutorial.skip")}
          </button>
          <div className="flex gap-2">
            {index > 0 ? (
              <button
                data-testid={DataTestId.TutorialBack}
                onClick={() => setIndex((current) => current - 1)}
                type="button"
                className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                {t("tutorial.back")}
              </button>
            ) : null}
            <button
              data-testid={DataTestId.TutorialNext}
              onClick={() => {
                if (isLast) {
                  onDone();
                  return;
                }
                setIndex((current) => current + 1);
              }}
              type="button"
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
            >
              {isLast ? t("tutorial.continue") : t("tutorial.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
