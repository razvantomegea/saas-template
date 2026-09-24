"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DataTestId } from "@/lib/constants/data-test-id";
import { settingsOutlineButtonClassName } from "@/components/dashboard/settings-button-styles";
import {
  enablePushAlerts,
  isBraveBrowser,
} from "@/lib/notifications/enable-push";

export function SubscribePushButton() {
  const [busy, setBusy] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  async function onSubscribe() {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      const result = await enablePushAlerts({
        hasPushManager: "PushManager" in window,
        serviceWorker: navigator.serviceWorker,
        notification: window.Notification,
        fetch: window.fetch.bind(window),
        isBrave: await isBraveBrowser(navigator),
      });

      if (result.status === "subscribed") {
        setSubscribed(true);
        toast.success("Notifications enabled");
        return;
      }
      if (result.status === "unsupported") {
        toast.error("Push notifications are not supported in this browser");
        return;
      }
      toast.error(result.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      data-testid={DataTestId.PushSubscribeButton}
      disabled={busy || subscribed}
      onClick={() => void onSubscribe()}
      className={`${settingsOutlineButtonClassName} hover:border-emerald-500/50 hover:text-emerald-300`}
    >
      {subscribed
        ? "Notifications on"
        : busy
          ? "Enabling…"
          : "Enable notifications"}
    </button>
  );
}
