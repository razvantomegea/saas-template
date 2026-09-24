import Link from "next/link";
import { isE2eMockDashboard } from "@/lib/e2e/mock-dashboard";
import { requireServerSession } from "@/lib/better-auth/session";
import {
  getE2eMockPlan,
  getE2eMockSubscriptionStatus,
} from "@/lib/e2e/mock-plan";
import { resolveEntitlements } from "@/lib/subscription/entitlements";
import { getProfileByUserId } from "@/lib/subscription/profiles";
import { countNotesByUserId } from "@/lib/notes/queries";
import { UNLIMITED_NOTE_LIMIT } from "@/lib/subscription/plan-limits";

export default async function DashboardPage() {
  if (isE2eMockDashboard()) {
    const plan = await getE2eMockPlan();
    const entitlements = resolveEntitlements({
      plan,
      subscriptionStatus: getE2eMockSubscriptionStatus(plan),
    });
    return (
      <DashboardHome
        noteCount={0}
        noteLimit={entitlements.noteLimit}
        plan={entitlements.plan}
      />
    );
  }

  const session = await requireServerSession();
  const profile = await getProfileByUserId(session.user.id);
  const entitlements = resolveEntitlements({
    plan: profile?.plan ?? "none",
    subscriptionStatus: profile?.subscriptionStatus ?? "none",
  });
  const noteCount = await countNotesByUserId(session.user.id);

  return (
    <DashboardHome
      noteCount={noteCount}
      noteLimit={entitlements.noteLimit}
      plan={entitlements.plan}
    />
  );
}

function DashboardHome({
  noteCount,
  noteLimit,
  plan,
}: {
  noteCount: number;
  noteLimit: number;
  plan: string;
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-100">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Current plan:{" "}
          <span className="font-medium text-zinc-200">{plan}</span>
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-semibold text-zinc-100">Notes</h2>
        <p className="mt-2 text-sm text-zinc-400">
          {noteCount} of{" "}
          {noteLimit >= UNLIMITED_NOTE_LIMIT ? "unlimited" : noteLimit} notes
          used.
        </p>
        <Link
          href="/dashboard/notes"
          className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
        >
          Go to notes
        </Link>
      </section>
    </div>
  );
}
