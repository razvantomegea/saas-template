"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  AUTH_INPUT_CLASS_NAME,
  AUTH_SUBMIT_CLASS_NAME,
} from "@/components/auth/auth-form-styles";
import {
  passwordResetErrorMessage,
  requestPasswordResetEmail,
} from "@/components/auth/password-reset-actions";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";

export function ForgotPasswordForm() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const result = await requestPasswordResetEmail({ email, redirectTo });

      if (result.type === "error") {
        toast.error(passwordResetErrorMessage(t, result.code, result.message));
        return;
      }

      setSuccess(true);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">{t("auth.forgotTitle")}</h1>
        <p className="text-sm text-zinc-500">{t("auth.forgotSubtitle")}</p>
      </div>

      {success ? (
        <p
          className="rounded-lg border border-emerald-800/60 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-200"
          data-testid={DataTestId.ForgotPasswordSuccess}
        >
          {t("auth.forgotSuccess")}
        </p>
      ) : (
        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="forgot-password-email"
              className="block text-sm text-zinc-400"
            >
              {t("auth.email")}
            </label>
            <input
              id="forgot-password-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={AUTH_INPUT_CLASS_NAME}
              data-testid={DataTestId.ForgotPasswordEmail}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={AUTH_SUBMIT_CLASS_NAME}
            data-testid={DataTestId.ForgotPasswordSubmit}
          >
            {isSubmitting ? t("common.sending") : t("auth.submitForgot")}
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
