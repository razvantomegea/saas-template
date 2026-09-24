import { SettingsPageClient } from "@/components/dashboard/SettingsPageClient";
import { isE2eMockDashboard } from "@/lib/e2e/mock-dashboard";
import { requireServerSession } from "@/lib/better-auth/session";

export default async function SettingsPage() {
  if (isE2eMockDashboard()) {
    return <SettingsPageClient userEmail="demo@example.com" />;
  }

  const session = await requireServerSession();
  return <SettingsPageClient userEmail={session.user.email} />;
}
