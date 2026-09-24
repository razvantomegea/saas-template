import { eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import type { StripePlanKey } from "@/lib/config/stripe";
import { mapStripeStatus } from "@/lib/config/stripe";
import { stripe } from "@/lib/stripe/client";
import { PLAN } from "@/lib/subscription/plan-limits";
import { updateProfilePlan, type Profile } from "@/lib/subscription/profiles";

type ResolveStripeCustomerIdParams = {
  userId: string;
  email: string;
  profileStripeCustomerId: string | null;
};

export async function resolveStripeCustomerIdForUser(
  params: ResolveStripeCustomerIdParams,
): Promise<string | null> {
  if (params.profileStripeCustomerId) {
    return params.profileStripeCustomerId;
  }

  const search = await stripe.customers.search({
    query: `metadata['userId']:'${params.userId}'`,
    limit: 1,
  });
  const fromMetadata = search.data[0]?.id;
  if (fromMetadata) {
    return fromMetadata;
  }

  if (!params.email) {
    return null;
  }

  const byEmail = await stripe.customers.list({
    email: params.email,
    limit: 100,
  });

  const metadataMatch = byEmail.data.find(
    (customer) => customer.metadata?.userId === params.userId,
  );
  if (metadataMatch) {
    return metadataMatch.id;
  }

  if (byEmail.data.length === 1) {
    return byEmail.data[0].id;
  }

  return null;
}

export async function updateUserSubscription(params: {
  userId: string;
  plan: StripePlanKey | "none";
  subscriptionStatus: string;
  stripeCustomerId?: string | null;
}): Promise<void> {
  const plan = params.plan === "none" ? PLAN.NONE : params.plan;

  await updateProfilePlan({
    userId: params.userId,
    plan,
    subscriptionStatus: mapStripeStatus(params.subscriptionStatus),
    stripeCustomerId: params.stripeCustomerId,
  });
}

export async function getProfileByStripeCustomerId(
  stripeCustomerId: string,
): Promise<Profile | undefined> {
  const rows = await db
    .select()
    .from(profiles)
    .where(eq(profiles.stripeCustomerId, stripeCustomerId))
    .limit(1);

  return rows[0];
}
