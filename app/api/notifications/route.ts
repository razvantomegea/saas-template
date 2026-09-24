import { assertDashboardSession } from "@/lib/dashboard/session";
import { dashboardRouteErrorResponse } from "@/lib/dashboard/route-error";
import {
  countUnreadNotifications,
  listNotifications,
  markNotificationsRead,
  type ListedNotification,
} from "@/lib/notifications/notifications";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function serializeNotification(notification: ListedNotification) {
  return {
    id: notification.id,
    kind: notification.kind,
    title: notification.title,
    body: notification.body,
    href: notification.href,
    readAt: notification.readAt?.toISOString() ?? null,
    createdAt: notification.createdAt.toISOString(),
  };
}

export async function GET(request: Request) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  try {
    const { session } = await assertDashboardSession();
    const [notifications, unreadCount] = await Promise.all([
      listNotifications(session.user.id),
      countUnreadNotifications(session.user.id),
    ]);

    return Response.json({
      notifications: notifications.map(serializeNotification),
      unreadCount,
    });
  } catch (error) {
    return dashboardRouteErrorResponse({
      error,
      logLabel: "[GET /api/notifications]",
      fallbackMessage: "Failed to fetch notifications",
    });
  }
}

export async function POST(request: Request) {
  const blocked = requireTrustedOrigin(request);
  if (blocked) return blocked;

  try {
    const { session } = await assertDashboardSession();
    const notifications = await listNotifications(session.user.id);
    await markNotificationsRead(
      session.user.id,
      notifications.map((notification) => notification.id),
    );
    return Response.json({ ok: true });
  } catch (error) {
    return dashboardRouteErrorResponse({
      error,
      logLabel: "[POST /api/notifications]",
      fallbackMessage: "Failed to update notifications",
    });
  }
}
