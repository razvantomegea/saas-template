import { randomUUID } from "node:crypto";
import { and, count, desc, eq, inArray, isNull } from "drizzle-orm";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { schedulePushNotification } from "@/lib/notifications/web-push";

const NOTIFICATIONS_LIMIT = 20;

export type Notification = typeof notifications.$inferSelect;
export type ListedNotification = Omit<Notification, "userId">;

export async function recordNotification(params: {
  userId: string;
  kind: string;
  title: string;
  body: string;
  href?: string;
}): Promise<void> {
  await db.insert(notifications).values({
    id: randomUUID(),
    userId: params.userId,
    kind: params.kind,
    title: params.title,
    body: params.body,
    href: params.href ?? null,
  });
}

export async function listNotifications(
  userId: string,
): Promise<ListedNotification[]> {
  return db
    .select({
      id: notifications.id,
      kind: notifications.kind,
      title: notifications.title,
      body: notifications.body,
      href: notifications.href,
      readAt: notifications.readAt,
      createdAt: notifications.createdAt,
    })
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(NOTIFICATIONS_LIMIT);
}

export async function countUnreadNotifications(
  userId: string,
): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), isNull(notifications.readAt)));

  return row?.value ?? 0;
}

export async function markNotificationsRead(
  userId: string,
  notificationIds: readonly string[],
): Promise<void> {
  if (notificationIds.length === 0) {
    return;
  }

  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(notifications.userId, userId),
        inArray(notifications.id, notificationIds),
        isNull(notifications.readAt),
      ),
    );
}

/** Records the in-app notification and best-effort pushes it — failures never throw. */
export async function notifyUser(params: {
  userId: string;
  kind: string;
  title: string;
  body: string;
  href?: string;
}): Promise<void> {
  try {
    await recordNotification(params);
  } catch {
    return;
  }

  schedulePushNotification({
    userId: params.userId,
    payload: { title: params.title, body: params.body, url: params.href },
  });
}
