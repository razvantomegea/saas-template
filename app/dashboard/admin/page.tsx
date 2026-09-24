import type { Metadata } from "next";

import { AdminHub } from "@/components/admin/AdminHub";
import { PageRefreshBinder } from "@/lib/dashboard/page-refresh";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminHubPage() {
  return (
    <>
      <PageRefreshBinder
        skeleton={{ variant: "page", className: "max-w-4xl", blocks: 3 }}
      />
      <AdminHub />
    </>
  );
}
