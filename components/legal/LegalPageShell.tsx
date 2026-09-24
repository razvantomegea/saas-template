import type { ReactNode } from "react";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { DataTestId } from "@/lib/constants/data-test-id";

type LegalPageShellProps = {
  children: ReactNode;
};

export function LegalPageShell({ children }: LegalPageShellProps) {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main
        data-testid={DataTestId.LegalMain}
        className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6"
      >
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
