import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { TutorialProvider } from "@/components/tutorial/tutorial-provider";
import { ensureDashboardSession } from "@/lib/better-auth/ensure-dashboard-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await ensureDashboardSession();

  return (
    <TutorialProvider>
      <div className="flex min-h-full min-w-0 flex-col overflow-x-clip">
        <InstallPrompt />
        <DashboardHeader />
        <main className="flex-1">{children}</main>
        <MarketingFooter />
      </div>
    </TutorialProvider>
  );
}
