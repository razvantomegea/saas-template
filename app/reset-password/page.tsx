import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { createSiteMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createSiteMetadata({
  title: "Reset password",
  robots: { index: false, follow: true },
});

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ResetPasswordForm />
        <p className="mt-8 text-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            ← Back
          </Link>
        </p>
      </main>
      <MarketingFooter />
    </div>
  );
}
