export type PushEnableReason =
  | "permission-denied"
  | "push-service-unavailable"
  | "configuration"
  | "unknown";

export type PushEnableResult =
  | { status: "subscribed" }
  | { status: "unsupported" }
  | { status: "error"; reason: PushEnableReason; message: string };

export type PushManagerLike = {
  getSubscription: () => Promise<unknown>;
  subscribe: (options: PushSubscriptionOptionsInit) => Promise<unknown>;
};

export type EnablePushAlertsInput = {
  hasPushManager: boolean;
  serviceWorker?: {
    register: (url: string) => Promise<unknown>;
    ready: Promise<{ pushManager: PushManagerLike }>;
  };
  notification?: {
    permission: NotificationPermission;
    requestPermission: () => Promise<NotificationPermission>;
  };
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  isBrave?: boolean;
};

type BraveDetector = {
  brave?: { isBrave?: () => Promise<boolean> };
};

export function decodeVapidKey(value: string) {
  const trimmed = value.trim();
  const padding = "=".repeat((4 - (trimmed.length % 4)) % 4);
  const base64 = (trimmed + padding).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

export function classifyPushEnableError(error: unknown): PushEnableReason {
  const name = error instanceof Error ? error.name : "";
  const message = (
    error instanceof Error ? error.message : String(error ?? "")
  ).toLowerCase();

  if (name === "NotAllowedError") return "permission-denied";
  if (
    name === "AbortError" ||
    message.includes("push service") ||
    message.includes("registration failed")
  ) {
    return "push-service-unavailable";
  }
  if (message.includes("applicationserverkey")) return "configuration";
  return "unknown";
}

export function pushEnableErrorMessage(
  reason: PushEnableReason,
  options?: { isBrave?: boolean },
) {
  if (reason === "permission-denied") {
    return "Notifications could not be enabled. Check your browser notification permission.";
  }
  if (reason === "push-service-unavailable") {
    if (options?.isBrave) {
      return 'Brave blocks web push by default. Enable "Use Google services for push messaging" in brave://settings/privacy, then try again.';
    }
    return "Notifications could not be enabled. This browser's push service is unavailable.";
  }
  if (reason === "configuration") {
    return "Notifications could not be enabled. Push is not configured on this site.";
  }
  return "Notifications could not be enabled. Please try again.";
}

export async function isBraveBrowser(nav: Navigator | BraveDetector) {
  try {
    return (await (nav as BraveDetector).brave?.isBrave?.()) === true;
  } catch {
    return false;
  }
}

function errorResult(
  reason: PushEnableReason,
  isBrave?: boolean,
): Extract<PushEnableResult, { status: "error" }> {
  return {
    status: "error",
    reason,
    message: pushEnableErrorMessage(reason, { isBrave }),
  };
}

export async function enablePushAlerts(
  input: EnablePushAlertsInput,
): Promise<PushEnableResult> {
  if (!input.serviceWorker || !input.hasPushManager || !input.notification) {
    return { status: "unsupported" };
  }

  let permission = input.notification.permission;
  if (permission !== "granted") {
    permission = await input.notification.requestPermission();
  }
  if (permission !== "granted") {
    return errorResult("permission-denied", input.isBrave);
  }

  try {
    await input.serviceWorker.register("/sw.js");
    const registration = await input.serviceWorker.ready;
    const keyResponse = await input.fetch("/api/push/vapid-public-key");
    if (!keyResponse.ok) return errorResult("configuration", input.isBrave);
    const { publicKey } = (await keyResponse.json()) as { publicKey?: string };
    if (!publicKey?.trim()) return errorResult("configuration", input.isBrave);

    const existing = await registration.pushManager.getSubscription();
    const subscription =
      existing ??
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeVapidKey(publicKey),
      }));

    const response = await input.fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(subscription),
    });
    if (!response.ok) return errorResult("unknown", input.isBrave);
    return { status: "subscribed" };
  } catch (error) {
    return errorResult(classifyPushEnableError(error), input.isBrave);
  }
}
