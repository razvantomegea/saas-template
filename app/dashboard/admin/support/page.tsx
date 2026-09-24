import type { Metadata } from "next";

import { SupportAdminInbox } from "@/components/admin/SupportAdminInbox";
import { PageRefreshBinder } from "@/lib/dashboard/page-refresh";
import { listOpenSupportTickets } from "@/lib/help/support-tickets";

export const metadata: Metadata = {
  title: "Support inbox",
  robots: { index: false, follow: false },
};

export default async function SupportAdminPage() {
  const tickets = await listOpenSupportTickets();

  return (
    <>
      <PageRefreshBinder
        skeleton={{ variant: "page", className: "max-w-4xl", blocks: 4 }}
      />
      <SupportAdminInbox tickets={tickets} />
    </>
  );
}
