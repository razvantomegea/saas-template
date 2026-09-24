import type { ReactNode } from "react";
import { requireAdminSession } from "@/lib/admin/require-admin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminSession();
  return children;
}
