import { eq } from "drizzle-orm";
import { db } from "@/db";
import { processedWebhookEvents } from "@/db/schema";

export async function reserveStripeWebhookEvent(
  eventId: string,
): Promise<boolean> {
  const inserted = await db
    .insert(processedWebhookEvents)
    .values({ eventId })
    .onConflictDoNothing()
    .returning({ eventId: processedWebhookEvents.eventId });

  return inserted.length > 0;
}

/** Allow Stripe to retry after a handler failure (reservation is otherwise sticky). */
export async function releaseStripeWebhookEvent(
  eventId: string,
): Promise<void> {
  await db
    .delete(processedWebhookEvents)
    .where(eq(processedWebhookEvents.eventId, eventId));
}
