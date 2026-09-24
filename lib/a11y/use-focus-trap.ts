"use client";

import { useEffect, useRef, type RefObject } from "react";
import { getFocusableElements, handleTabTrap } from "@/lib/a11y/focus-trap";

export type UseFocusTrapParams = {
  containerRef: RefObject<HTMLElement | null>;
  active: boolean;
  onEscape?: () => void;
  /** Re-focus the first element when this value changes (e.g. panel swap). */
  focusKey?: unknown;
};

export function useFocusTrap({
  containerRef,
  active,
  onEscape,
  focusKey,
}: UseFocusTrapParams): void {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasActiveRef = useRef(false);

  useEffect(() => {
    if (active) {
      if (!wasActiveRef.current) {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
      }
      wasActiveRef.current = true;
      return;
    }

    if (wasActiveRef.current) {
      previousFocusRef.current?.focus?.();
    }
    wasActiveRef.current = false;
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (container) {
        getFocusableElements(container)[0]?.focus();
      }
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (!onEscape) {
          return;
        }
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      if (handleTabTrap({ container, shiftKey: event.shiftKey })) {
        event.preventDefault();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, containerRef, focusKey, onEscape]);
}
