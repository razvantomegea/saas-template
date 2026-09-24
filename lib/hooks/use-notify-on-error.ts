"use client";

import { useEffect } from "react";
import { notify } from "@/lib/notify";

type UseNotifyOnErrorOptions = {
  testId?: string;
};

export function useNotifyOnError(
  message: string | null | undefined,
  enabled = true,
  options?: UseNotifyOnErrorOptions,
): void {
  const testId = options?.testId;

  useEffect(() => {
    if (!enabled || !message) {
      return;
    }

    notify.error(message, testId ? { testId } : undefined);
  }, [enabled, message, testId]);
}
