"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { DataTestId } from "@/lib/constants/data-test-id";
import {
  TUTORIAL_SPOTLIGHT,
  TUTORIAL_SPOTLIGHT_KEYS,
  type TutorialSpotlightKey,
} from "@/components/tutorial/tour-copy";

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type SpotlightTourProps = {
  onFinish: () => void;
  onSkip: () => void;
};

function measureTarget(selector: string): Rect | null {
  const el = document.querySelector<HTMLElement>(`[data-tour="${selector}"]`);
  if (!el) {
    return null;
  }
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) {
    return null;
  }
  const pad = 8;
  return {
    top: Math.max(0, r.top - pad),
    left: Math.max(0, r.left - pad),
    width: r.width + pad * 2,
    height: r.height + pad * 2,
  };
}

export function SpotlightTour({ onFinish, onSkip }: SpotlightTourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const step =
    TUTORIAL_SPOTLIGHT_KEYS[
      Math.min(index, TUTORIAL_SPOTLIGHT_KEYS.length - 1)
    ] ?? "nav-home";
  const copy = TUTORIAL_SPOTLIGHT[step as TutorialSpotlightKey];
  const isLast = index >= TUTORIAL_SPOTLIGHT_KEYS.length - 1;

  useLayoutEffect(() => {
    function update() {
      setRect(measureTarget(step));
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [step]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onSkip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSkip]);

  const tooltipTop = rect
    ? Math.min(window.innerHeight - 200, rect.top + rect.height + 12)
    : window.innerHeight * 0.3;
  const tooltipLeft = rect
    ? Math.max(16, Math.min(window.innerWidth - 336, rect.left))
    : Math.max(16, (window.innerWidth - 320) / 2);

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[70]"
      data-testid={DataTestId.TutorialSpotlight}
      role="dialog"
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <mask id="tutorial-spotlight-mask">
            <rect fill="white" height="100%" width="100%" x="0" y="0" />
            {rect ? (
              <rect
                fill="black"
                height={rect.height}
                rx="10"
                width={rect.width}
                x={rect.left}
                y={rect.top}
              />
            ) : null}
          </mask>
        </defs>
        <rect
          fill="rgba(0,0,0,0.72)"
          height="100%"
          mask="url(#tutorial-spotlight-mask)"
          width="100%"
          x="0"
          y="0"
        />
      </svg>

      {rect ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-xl ring-2 ring-emerald-500"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
        />
      ) : null}

      <div
        className="absolute w-80 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl"
        style={{ top: tooltipTop, left: tooltipLeft }}
      >
        <p className="text-xs text-zinc-500">
          {index + 1} / {TUTORIAL_SPOTLIGHT_KEYS.length}
        </p>
        <h3 className="mt-1 text-sm font-semibold text-zinc-50">
          {copy.title}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{copy.body}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            data-testid={DataTestId.TutorialSkip}
            onClick={onSkip}
            type="button"
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            Skip
          </button>
          <div className="flex gap-2">
            {index > 0 ? (
              <button
                data-testid={DataTestId.TutorialBack}
                onClick={() => setIndex((current) => Math.max(0, current - 1))}
                type="button"
                className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                Back
              </button>
            ) : null}
            <button
              data-testid={DataTestId.TutorialNext}
              onClick={() => {
                if (isLast) {
                  onFinish();
                  return;
                }
                setIndex((current) => current + 1);
              }}
              type="button"
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
            >
              {isLast ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
