import { ApiError } from "@/lib/api-error";
import { requireServerSession } from "@/lib/better-auth/session";
import { getProfileByUserId } from "@/lib/subscription/profiles";
import {
  isSubscriptionActive,
  isSubscriptionStatus,
} from "@/lib/subscription/plan-limits";

export type AssertDashboardSessionOptions = {
  requireActiveSubscription?: boolean;
};

/** Session + profile guard shared by dashboard pages and API routes. */
export async function assertDashboardSession(
  options: AssertDashboardSessionOptions = {},
) {
  const session = await requireServerSession();
  const profile = await getProfileByUserId(session.user.id);

  if (!profile) {
    throw new ApiError("Profile not found", 404);
  }

  if (options.requireActiveSubscription) {
    if (!isSubscriptionStatus(profile.subscriptionStatus)) {
      throw new ApiError("Invalid subscription status", 400);
    }

    if (!isSubscriptionActive(profile.subscriptionStatus)) {
      throw new ApiError("Active subscription required", 403);
    }
  }

  return { session, profile };
}
