import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { profileEntitlements, profiles } from "@/db/schema";
import type {
  PlanKey,
  SubscriptionStatus,
} from "@/lib/subscription/plan-limits";

export type Profile = typeof profiles.$inferSelect;

export async function getProfileByUserId(
  userId: string,
): Promise<Profile | undefined> {
  const rows = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  return rows[0];
}

export async function ensureProfile(userId: string): Promise<Profile> {
  const existing = await getProfileByUserId(userId);
  if (existing) {
    return existing;
  }

  const inserted = await db
    .insert(profiles)
    .values({ userId })
    .onConflictDoNothing({ target: profiles.userId })
    .returning();

  if (inserted[0]) {
    return inserted[0];
  }

  const profile = await getProfileByUserId(userId);
  if (!profile) {
    throw new Error("Failed to create profile");
  }

  return profile;
}

export async function updateProfilePlan(params: {
  userId: string;
  plan: PlanKey;
  subscriptionStatus: SubscriptionStatus;
  stripeCustomerId?: string | null;
}): Promise<Profile> {
  const updated = await db
    .update(profiles)
    .set({
      plan: params.plan,
      subscriptionStatus: params.subscriptionStatus,
      ...(params.stripeCustomerId !== undefined
        ? { stripeCustomerId: params.stripeCustomerId }
        : {}),
      updatedAt: new Date(),
    })
    .where(eq(profiles.userId, params.userId))
    .returning();

  if (!updated[0]) {
    throw new Error(`Profile not found for user ${params.userId}`);
  }

  return updated[0];
}

export async function completeOnboarding(userId: string): Promise<void> {
  await db
    .update(profiles)
    .set({ onboardingCompletedAt: new Date(), updatedAt: new Date() })
    .where(eq(profiles.userId, userId));
}

/** Generic additive entitlement (add-ons, promos) — layered on top of the base plan. */
export async function grantEntitlement(params: {
  userId: string;
  entitlement: string;
  source: string;
}): Promise<void> {
  await db
    .insert(profileEntitlements)
    .values({
      userId: params.userId,
      entitlement: params.entitlement,
      source: params.source,
    })
    .onConflictDoUpdate({
      target: [profileEntitlements.userId, profileEntitlements.entitlement],
      set: { source: params.source, updatedAt: new Date() },
    });
}

export async function hasEntitlement(
  userId: string,
  entitlement: string,
): Promise<boolean> {
  const rows = await db
    .select({ entitlement: profileEntitlements.entitlement })
    .from(profileEntitlements)
    .where(
      and(
        eq(profileEntitlements.userId, userId),
        eq(profileEntitlements.entitlement, entitlement),
      ),
    )
    .limit(1);

  return rows.length > 0;
}
