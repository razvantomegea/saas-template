import { notFound } from "next/navigation";
import { parseAdminUserIds } from "@/lib/admin/parse-admin-user-ids";
import { getServerSession } from "@/lib/better-auth/session";

export async function requireAdminSession() {
  const session = await getServerSession();
  if (!session?.user) {
    notFound();
  }

  const adminIds = parseAdminUserIds(process.env.ADMIN_USER_IDS);

  if (adminIds.size === 0 || !adminIds.has(session.user.id)) {
    notFound();
  }

  return session;
}
