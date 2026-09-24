"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { settingsDangerButtonClassName } from "@/components/dashboard/settings-button-styles";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { useT } from "@/components/i18n/LocaleProvider";
import { SubscribePushButton } from "@/components/push/subscribe-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { authClient } from "@/lib/better-auth/client";
import { DataTestId } from "@/lib/constants/data-test-id";

type SettingsPageClientProps = {
  userEmail: string;
};

export function SettingsPageClient({ userEmail }: SettingsPageClientProps) {
  const t = useT();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(t("settings.deleteConfirm"))) {
      return;
    }
    setDeleting(true);
    try {
      const result = await authClient.deleteUser({});
      if (result.error) {
        toast.error(result.error.message ?? t("settings.deleteFailed"));
        return;
      }
      toast.success(t("settings.deleteCheckEmail"));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto min-w-0 max-w-2xl space-y-8 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-100">
          {t("settings.title")}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">{t("settings.subtitle")}</p>
        <p className="mt-1 text-sm text-zinc-500">{userEmail}</p>
      </header>

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          {t("settings.appearance")}
        </h2>
        <ThemeToggle />
        <div className="pt-2">
          <p className="mb-2 text-sm font-medium text-zinc-200">
            {t("settings.language")}
          </p>
          <LocaleSwitcher />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          {t("settings.notifications")}
        </h2>
        <p className="text-sm text-zinc-400">
          {t("settings.notificationsBody")}
        </p>
        <SubscribePushButton />
      </section>

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          {t("settings.account")}
        </h2>
        <LogoutButton variant="settings" />
      </section>

      <section className="space-y-4 rounded-xl border border-red-900/40 bg-red-950/10 p-4">
        <h2 className="text-lg font-semibold text-red-200">
          {t("settings.dangerZone")}
        </h2>
        <p className="text-sm text-zinc-400">{t("settings.deleteWarning")}</p>
        <button
          className={settingsDangerButtonClassName}
          data-testid={DataTestId.SettingsDeleteButton}
          disabled={deleting}
          onClick={() => void handleDelete()}
          type="button"
        >
          {deleting
            ? t("settings.deletingAccount")
            : t("settings.deleteAccount")}
        </button>
      </section>
    </div>
  );
}
