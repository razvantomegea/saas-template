import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants/branding";

type LogoProps = {
  href?: string;
  className?: string;
};

/** Text-mark logo — swap for an SVG/image asset when you have real brand art. */
export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-lg font-semibold text-zinc-50 ${className ?? ""}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white">
        S
      </span>
      {BRAND_NAME}
    </Link>
  );
}
