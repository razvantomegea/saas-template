"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/admin/require-admin";
import { closeSupportTicket } from "@/lib/help/support-tickets";

export async function closeSupportTicketAction(id: string): Promise<void> {
  await requireAdminSession();
  const ok = await closeSupportTicket(id);
  if (!ok) {
    throw new Error("Ticket not found");
  }
  revalidatePath("/dashboard/admin/support");
}
