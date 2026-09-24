import { redirect } from "next/navigation";
import { isE2eMockDashboard } from "@/lib/e2e/mock-dashboard";
import { requireServerSession } from "@/lib/better-auth/session";

async function loadDashboardSession() {
  try {
    return await requireServerSession();
  } catch (error) {
    console.error("requireServerSession failed", error);
    return null;
  }
}

export async function ensureDashboardSession(): Promise<void> {
  if (isE2eMockDashboard()) {
    return;
  }

  const session = await loadDashboardSession();
  if (!session?.user) {
    redirect("/login");
  }
}
