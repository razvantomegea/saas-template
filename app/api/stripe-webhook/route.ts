import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  constructStripeWebhookEvent,
  processStripeWebhookEvent,
} from "@/lib/stripe/webhook-handlers";
import {
  reserveStripeWebhookEvent,
  releaseStripeWebhookEvent,
} from "@/lib/stripe/webhook-events";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const parsed = constructStripeWebhookEvent({
    body,
    signature: headersList.get("Stripe-Signature"),
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  });

  if (!parsed.ok) {
    return parsed.response;
  }

  const reserved = await reserveStripeWebhookEvent(parsed.event.id);
  if (!reserved) {
    return NextResponse.json({ received: true });
  }

  try {
    const handlerResponse = await processStripeWebhookEvent(parsed.event);
    if (handlerResponse) {
      if (handlerResponse.status >= 500) {
        await releaseStripeWebhookEvent(parsed.event.id);
      }
      return handlerResponse;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    await releaseStripeWebhookEvent(parsed.event.id);
    console.error("[stripe-webhook] Handler failed", {
      eventId: parsed.event.id,
      eventType: parsed.event.type,
      error,
    });
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
