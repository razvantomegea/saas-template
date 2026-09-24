"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import type { AuthActionResult } from "@/components/auth/auth-form-actions";
import {
  performEmailAuth,
  performGoogleAuth,
} from "@/components/auth/auth-form-actions";
import { PASSWORD_UPDATED_MESSAGE_CODE } from "@/components/auth/auth-form-styles";
import { AuthFormFields } from "@/components/auth/AuthFormFields";
import type { SignupTermsConsentHandle } from "@/components/auth/SignupTermsConsent";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import { buildAuthCallbackUrls } from "@/lib/better-auth/build-auth-callback-urls";
import { mapOAuthError } from "@/lib/better-auth/map-oauth-error";
import { DataTestId } from "@/lib/constants/data-test-id";
import { useNotifyOnError } from "@/lib/hooks/use-notify-on-error";
import { useNotifyOnSuccess } from "@/lib/hooks/use-notify-on-success";
import { notify } from "@/lib/notify";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm(props: AuthFormProps) {
  return (
    <Suspense fallback={<AuthFormFallback mode={props.mode} />}>
      <AuthFormContent {...props} />
    </Suspense>
  );
}

function AuthFormFallback({ mode }: AuthFormProps) {
  const t = useT();
  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1
          className="text-2xl font-semibold"
          data-testid={
            mode === "signup" ? DataTestId.SignupTitle : DataTestId.LoginTitle
          }
        >
          {mode === "login" ? t("auth.loginTitle") : t("auth.signupTitle")}
        </h1>
        <p
          className="text-sm text-zinc-500"
          data-testid={DataTestId.AuthFormLoading}
        >
          {t("common.loading")}
        </p>
      </div>
    </div>
  );
}

function AuthFormContent({ mode }: AuthFormProps) {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const termsRef = useRef<SignupTermsConsentHandle>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsHighlighted, setTermsHighlighted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const { callbackURL, errorCallbackURL } = buildAuthCallbackUrls(
    searchParams.get("next") ??
      (mode === "signup" ? "/dashboard/billing" : "/dashboard"),
    { source: mode },
  );
  const oauthErrorCode = searchParams.get("error");
  const oauthErrorDescription = searchParams.get("error_description");
  const rawSuccessMessage = searchParams.get("message");
  const successMessage =
    rawSuccessMessage === PASSWORD_UPDATED_MESSAGE_CODE ||
    rawSuccessMessage === t("auth.passwordUpdatedCode")
      ? t("auth.passwordUpdated")
      : (rawSuccessMessage ??
        (searchParams.get("accountDeleted") === "1"
          ? t("auth.accountDeleted")
          : null));
  const oauthError = mapOAuthError(oauthErrorCode, oauthErrorDescription);
  const authErrorTestId =
    mode === "signup" ? DataTestId.SignupAuthError : DataTestId.LoginAuthError;

  useNotifyOnError(oauthError, Boolean(oauthError), {
    testId: authErrorTestId,
  });

  useNotifyOnSuccess(
    successMessage,
    mode === "login" && Boolean(successMessage),
    { testId: DataTestId.LoginAuthSuccess },
  );

  function showTermsError() {
    notify.error(t("auth.signupTermsError"), {
      testId: DataTestId.SignupAuthError,
    });
    setTermsHighlighted(true);
    termsRef.current?.focusError();
  }

  function requireAcceptedTerms(): boolean {
    if (mode !== "signup" || acceptedTerms) {
      return true;
    }

    showTermsError();
    return false;
  }

  function handleTermsChange(checked: boolean) {
    setAcceptedTerms(checked);
    if (checked) {
      setTermsHighlighted(false);
    }
  }

  async function runAuthAction(
    action: () => Promise<AuthActionResult>,
  ): Promise<void> {
    setIsActive(true);
    try {
      const result = await action();
      if (result.type === "error") {
        notify.error(result.message, { testId: authErrorTestId });
        return;
      }
      router.push(result.url);
      router.refresh();
    } finally {
      setIsActive(false);
    }
  }

  async function submitEmailAuth() {
    if (!requireAcceptedTerms()) {
      return;
    }

    await runAuthAction(() =>
      performEmailAuth({ mode, email, password, name, callbackURL }),
    );
  }

  function handleEmailSubmit(event: React.FormEvent) {
    event.preventDefault();
    void submitEmailAuth();
  }

  async function handleGoogle() {
    if (!requireAcceptedTerms()) {
      return;
    }

    await runAuthAction(() =>
      performGoogleAuth({ callbackURL, errorCallbackURL }),
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1
          className="text-2xl font-semibold"
          data-testid={
            mode === "signup" ? DataTestId.SignupTitle : DataTestId.LoginTitle
          }
        >
          {mode === "login" ? t("auth.loginTitle") : t("auth.signupTitle")}
        </h1>
        <p className="text-sm text-zinc-500">
          {mode === "login"
            ? t("auth.loginSubtitle")
            : t("auth.signupSubtitle")}
        </p>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={isActive}
          data-testid={DataTestId.GoogleSignInButton}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
        >
          {t("auth.google")}
        </button>

        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <div className="h-px flex-1 bg-zinc-800" />
          {t("auth.orEmail")}
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
      </div>

      <form onSubmit={handleEmailSubmit}>
        <AuthFormFields
          mode={mode}
          email={email}
          password={password}
          name={name}
          acceptedTerms={acceptedTerms}
          termsHighlighted={termsHighlighted}
          isActive={isActive}
          termsRef={termsRef}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onNameChange={setName}
          onTermsChange={handleTermsChange}
        />
      </form>

      <p className="text-center text-sm text-zinc-500">
        {mode === "login" ? (
          <>
            {t("auth.noAccount")}{" "}
            <LocalizedLink
              href="/signup"
              data-testid={DataTestId.LoginSignupLink}
              className="text-emerald-400 hover:underline"
            >
              {t("auth.switchToSignup")}
            </LocalizedLink>
          </>
        ) : (
          <>
            {t("auth.hasAccount")}{" "}
            <LocalizedLink
              href="/login"
              data-testid={DataTestId.SignupLoginLink}
              className="text-emerald-400 hover:underline"
            >
              {t("auth.switchToLogin")}
            </LocalizedLink>
          </>
        )}
      </p>
    </div>
  );
}
