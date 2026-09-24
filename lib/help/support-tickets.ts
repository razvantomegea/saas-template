import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { supportTickets } from "@/db/schema";
import type { CreateSupportTicketInput } from "@/lib/help/support-ticket-schema";
import type { SupportCategory } from "@/lib/help/constants";

export type SupportTicketStatus = "open" | "closed";

export async function createSupportTicket(params: {
  input: CreateSupportTicketInput;
  userId: string | null;
}): Promise<{ id: string }> {
  const id = randomUUID();
  await db.insert(supportTickets).values({
    id,
    userId: params.userId,
    email: params.input.email,
    category: params.input.category,
    subject: params.input.subject,
    body: params.input.body,
    status: "open" satisfies SupportTicketStatus,
  });
  return { id };
}

export type SupportTicketListItem = {
  id: string;
  userId: string | null;
  email: string;
  category: SupportCategory | string;
  subject: string;
  body: string;
  status: SupportTicketStatus | string;
  createdAt: Date;
};

export async function listOpenSupportTickets(
  limit = 100,
): Promise<SupportTicketListItem[]> {
  const rows = await db
    .select({
      id: supportTickets.id,
      userId: supportTickets.userId,
      email: supportTickets.email,
      category: supportTickets.category,
      subject: supportTickets.subject,
      body: supportTickets.body,
      status: supportTickets.status,
      createdAt: supportTickets.createdAt,
    })
    .from(supportTickets)
    .where(eq(supportTickets.status, "open"))
    .orderBy(desc(supportTickets.createdAt))
    .limit(limit);

  return rows;
}

export async function closeSupportTicket(id: string): Promise<boolean> {
  const updated = await db
    .update(supportTickets)
    .set({ status: "closed", updatedAt: new Date() })
    .where(eq(supportTickets.id, id))
    .returning({ id: supportTickets.id });

  return updated.length > 0;
}

/**
 * Operator notify hook (email/webhook). No-op until SUPPORT_NOTIFY_WEBHOOK
 * or similar is configured — keeps ticket create path testable.
 */
export async function notifyOperatorOfTicket(params: {
  id: string;
  category: string;
  subject: string;
  email: string;
}): Promise<void> {
  const webhook = process.env.SUPPORT_NOTIFY_WEBHOOK?.trim();
  if (!webhook) {
    return;
  }
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New support ticket ${params.id} [${params.category}] ${params.subject} from ${params.email}`,
      }),
    });
    if (!response.ok) {
      console.error("[support] notifyOperator webhook failed", {
        status: response.status,
        id: params.id,
      });
    }
  } catch (error) {
    console.error("[support] notifyOperator failed", error);
  }
}
