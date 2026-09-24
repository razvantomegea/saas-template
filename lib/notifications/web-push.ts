import webPush from "web-push";
import { isAllowedPushEndpoint } from "@/lib/notifications/push-endpoint";
import {
  deletePushSubscription,
  listProductAlertSubscriptions,
} from "@/lib/notifications/push-subscriptions";
import { getVapidConfig } from "@/lib/notifications/vapid";

/** Finite socket timeout so stalled push endpoints cannot hang the caller. */
export const WEB_PUSH_REQUEST_TIMEOUT_MS = 10_000;

export type PushNotificationPayload = {
  title: string;
  body: string;
  url?: string;
};

function configureWebPush() {
  const vapid = getVapidConfig();
  webPush.setVapidDetails(vapid.subject, vapid.publicKey, vapid.privateKey);
}

function isGoneStatus(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }
  const statusCode =
    "statusCode" in error
      ? Number((error as { statusCode: unknown }).statusCode)
      : NaN;
  return statusCode === 404 || statusCode === 410;
}

export async function sendPushNotification(params: {
  userId: string;
  payload: PushNotificationPayload;
}): Promise<void> {
  let subscriptions;
  try {
    getVapidConfig();
    subscriptions = await listProductAlertSubscriptions(params.userId);
  } catch {
    return;
  }

  const allowedSubscriptions = subscriptions.filter((subscription) =>
    isAllowedPushEndpoint(subscription.endpoint),
  );

  if (allowedSubscriptions.length === 0) {
    return;
  }

  configureWebPush();

  const payload = JSON.stringify({
    title: params.payload.title,
    body: params.payload.body,
    url: params.payload.url ?? "/dashboard",
  });

  await Promise.allSettled(
    allowedSubscriptions.map(async (subscription) => {
      try {
        await webPush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          payload,
          { timeout: WEB_PUSH_REQUEST_TIMEOUT_MS },
        );
      } catch (error) {
        if (isGoneStatus(error)) {
          await deletePushSubscription({
            endpoint: subscription.endpoint,
            userId: params.userId,
          });
        }
      }
    }),
  );
}

/** Fire-and-forget wrapper so callers never block on push delivery. */
export function schedulePushNotification(params: {
  userId: string;
  payload: PushNotificationPayload;
}): void {
  void sendPushNotification(params).catch(() => {
    // Push failures must not affect the calling flow.
  });
}
