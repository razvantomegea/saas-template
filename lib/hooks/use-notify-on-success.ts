"use client";

import { useEffect } from "react";
import { notify } from "@/lib/notify";

type UseNotifyOnSuccessOptions = {
  testId?: string;
};

export function useNotifyOnSuccess(
  message: string | null | undefined,
  enabled = true,
  options?: UseNotifyOnSuccessOptions,
): void {
  const testId = options?.testId;

  useEffect(() => {
    if (!enabled || !message) {
      return;
    }

    notify.success(message, testId ? { testId } : undefined);
  }, [enabled, message, testId]);
}
