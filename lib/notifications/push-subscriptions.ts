import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { notificationPreferences, pushSubscriptions } from "@/db/schema";
import { ApiError } from "@/lib/api-error";

export type StoredPushSubscription = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  userId: string;
};

async function ensureProductAlertPreference(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  subscriptionId: string,
): Promise<void> {
  const [existing] = await tx
    .select({ id: notificationPreferences.id })
    .from(notificationPreferences)
    .where(eq(notificationPreferences.subscriptionId, subscriptionId))
    .limit(1);

  if (existing) {
    return;
  }

  await tx.insert(notificationPreferences).values({
    id: randomUUID(),
    subscriptionId,
    productAlerts: true,
  });
}

export async function savePushSubscription(
  subscription: StoredPushSubscription,
) {
  const userId = subscription.userId;

  return db.transaction(async (tx) => {
    const [existing] = await tx
      .select({
        id: pushSubscriptions.id,
        userId: pushSubscriptions.userId,
      })
      .from(pushSubscriptions)
      .where(eq(pushSubscriptions.endpoint, subscription.endpoint))
      .limit(1);

    if (existing) {
      if (existing.userId && existing.userId !== userId) {
        throw new ApiError("Push subscription belongs to another user", 409);
      }

      await tx
        .update(pushSubscriptions)
        .set({
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
          userId,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(pushSubscriptions.id, existing.id),
            eq(pushSubscriptions.endpoint, subscription.endpoint),
          ),
        );

      await ensureProductAlertPreference(tx, existing.id);
      return existing.id;
    }

    const id = randomUUID();
    await tx.insert(pushSubscriptions).values({
      id,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
      userId,
    });
    await tx.insert(notificationPreferences).values({
      id: randomUUID(),
      subscriptionId: id,
      productAlerts: true,
    });
    return id;
  });
}

export async function deletePushSubscription(params: {
  endpoint: string;
  userId: string;
}): Promise<void> {
  await db
    .delete(pushSubscriptions)
    .where(
      and(
        eq(pushSubscriptions.endpoint, params.endpoint),
        eq(pushSubscriptions.userId, params.userId),
      ),
    );
}

export async function listProductAlertSubscriptions(userId: string): Promise<
  Array<{
    id: string;
    endpoint: string;
    p256dh: string;
    auth: string;
  }>
> {
  return db
    .select({
      id: pushSubscriptions.id,
      endpoint: pushSubscriptions.endpoint,
      p256dh: pushSubscriptions.p256dh,
      auth: pushSubscriptions.auth,
    })
    .from(pushSubscriptions)
    .innerJoin(
      notificationPreferences,
      eq(notificationPreferences.subscriptionId, pushSubscriptions.id),
    )
    .where(
      and(
        eq(pushSubscriptions.userId, userId),
        eq(notificationPreferences.productAlerts, true),
      ),
    );
}
