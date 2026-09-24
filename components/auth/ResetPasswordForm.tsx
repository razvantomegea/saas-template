"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import {
  AUTH_INPUT_CLASS_NAME,
  AUTH_SUBMIT_CLASS_NAME,
  MIN_PASSWORD_LENGTH,
  PASSWORD_UPDATED_MESSAGE,
} from "@/components/auth/auth-form-styles";
import { submitPasswordReset } from "@/components/auth/password-reset-actions";
import { DataTestId } from "@/lib/constants/data-test-id";

export function ResetPasswordForm() {
  return (
    <Suspense fallback={<ResetPasswordFormFallback />}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}

function ResetPasswordFormFallback() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Reset your password</h1>
        <p className="text-sm text-zinc-500">Loading…</p>
      </div>
    </div>
  );
}

function ResetPasswordFormContent() {
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
      toast.error(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitPasswordReset({
        newPassword: password,
        token,
      });

      if (result.type === "error") {
        toast.error(result.message);
        return;
      }

      router.push(
        `/login?message=${encodeURIComponent(PASSWORD_UPDATED_MESSAGE)}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Reset your password</h1>
        <p className="text-sm text-zinc-500">Choose a new password below.</p>
      </div>

      {invalidToken ? (
        <div className="space-y-4">
          <p className="rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            This reset link is invalid or has expired.
          </p>
          <p className="text-center text-sm text-zinc-500">
            <Link
              href="/forgot-password"
              className="text-emerald-400 hover:underline"
            >
              Request a new link
            </Link>
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
              New password
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
              Confirm password
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
            {isSubmitting ? "Saving…" : "Reset password"}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-zinc-500">
        <Link href="/login" className="text-emerald-400 hover:underline">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
