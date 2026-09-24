"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import {
  AUTH_INPUT_CLASS_NAME,
  AUTH_SUBMIT_CLASS_NAME,
  MIN_PASSWORD_LENGTH,
  PASSWORD_UPDATED_MESSAGE_CODE,
} from "@/components/auth/auth-form-styles";
import {
  passwordResetErrorMessage,
  submitPasswordReset,
} from "@/components/auth/password-reset-actions";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";

export function ResetPasswordForm() {
  return (
    <Suspense fallback={<ResetPasswordFormFallback />}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}

function ResetPasswordFormFallback() {
  const t = useT();
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">{t("auth.resetTitle")}</h1>
        <p className="text-sm text-zinc-500">{t("common.loading")}</p>
      </div>
    </div>
  );
}

function ResetPasswordFormContent() {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const errorParam = searchParams.get("error");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const invalidToken = !token || Boolean(errorParam);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token || isSubmitting) {
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error(t("auth.passwordTooShort", { min: MIN_PASSWORD_LENGTH }));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("auth.passwordMismatch"));
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitPasswordReset({
        newPassword: password,
        token,
      });

      if (result.type === "error") {
        toast.error(passwordResetErrorMessage(t, result.code, result.message));
        return;
      }

      router.push(
        `/login?message=${encodeURIComponent(PASSWORD_UPDATED_MESSAGE_CODE)}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">{t("auth.resetTitle")}</h1>
        <p className="text-sm text-zinc-500">{t("auth.resetSubtitle")}</p>
      </div>

      {invalidToken ? (
        <div className="space-y-4">
          <p className="rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            {t("auth.invalidReset")}
          </p>
          <p className="text-center text-sm text-zinc-500">
            <LocalizedLink
              href="/forgot-password"
              className="text-emerald-400 hover:underline"
            >
              {t("auth.resetRequestNewLink")}
            </LocalizedLink>
          </p>
        </div>
      ) : (
        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="reset-password-new"
              className="block text-sm text-zinc-400"
            >
              {t("auth.resetNewPassword")}
            </label>
            <input
              id="reset-password-new"
              type="password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={AUTH_INPUT_CLASS_NAME}
              data-testid={DataTestId.ResetPasswordNew}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="reset-password-confirm"
              className="block text-sm text-zinc-400"
            >
              {t("auth.confirmPassword")}
            </label>
            <input
              id="reset-password-confirm"
              type="password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={AUTH_INPUT_CLASS_NAME}
              data-testid={DataTestId.ResetPasswordConfirm}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={AUTH_SUBMIT_CLASS_NAME}
            data-testid={DataTestId.ResetPasswordSubmit}
          >
            {isSubmitting ? t("common.saving") : t("auth.submitReset")}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-zinc-500">
        <LocalizedLink
          href="/login"
          className="text-emerald-400 hover:underline"
        >
          {t("auth.forgotBackToLogin")}
        </LocalizedLink>
      </p>
    </div>
  );
}
