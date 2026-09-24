import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { createSiteMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createSiteMetadata({
  title: "Sign up",
  robots: { index: false, follow: true },
});

export default function SignupPage() {
  return (
    <div className="flex min-h-full flex-col">
      <MarketingHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <AuthForm mode="signup" />
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
