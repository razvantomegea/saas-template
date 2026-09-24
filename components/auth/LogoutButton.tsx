"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { settingsOutlineButtonClassName } from "@/components/dashboard/settings-button-styles";
import {
  topNavMobileSecondaryClassName,
  topNavSecondaryClassName,
} from "@/components/layout/top-nav-styles";
import { authClient } from "@/lib/better-auth/client";
import { DataTestId } from "@/lib/constants/data-test-id";

type LogoutButtonProps = {
  testId?: string | null;
  variant?: "nav" | "mobile" | "settings";
};

const LOGOUT_VARIANT_CLASS = {
  nav: `${topNavSecondaryClassName} disabled:opacity-50`,
  mobile: `${topNavMobileSecondaryClassName} disabled:opacity-50`,
  settings: settingsOutlineButtonClassName,
} as const;

export function LogoutButton({
  testId = DataTestId.DashboardLogoutButton,
  variant = "nav",
}: LogoutButtonProps = {}) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  async function handleLogout() {
    setIsActive(true);
    try {
      await Promise.race([
        authClient.signOut(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("signOut timed out")), 5000),
        ),
      ]);
    } catch {
      // Still navigate away so the user is not stuck on the dashboard.
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={() => void handleLogout()}
      disabled={isActive}
      data-testid={testId ?? undefined}
      className={LOGOUT_VARIANT_CLASS[variant]}
    >
      Log out
    </button>
  );
}
