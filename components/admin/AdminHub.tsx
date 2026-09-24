"use client";

import Link from "next/link";

import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";

const HUB_LINKS = [
  {
    href: "/dashboard/admin/support",
    titleKey: "admin.supportCardTitle" as const,
    descriptionKey: "admin.supportCardDescription" as const,
    testId: DataTestId.AdminHubSupportLink,
  },
];

export function AdminHub() {
  const t = useT();

  return (
    <div
      data-testid={DataTestId.AdminHub}
      className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6"
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-zinc-100">
          {t("admin.hubTitle")}
        </h1>
        <p className="text-sm text-zinc-500">{t("admin.hubSubtitle")}</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {HUB_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              data-testid={link.testId}
              className="block h-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-600 hover:bg-zinc-900"
            >
              <h2 className="text-base font-medium text-zinc-100">
                {t(link.titleKey)}
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                {t(link.descriptionKey)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
