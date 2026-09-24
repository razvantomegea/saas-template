"use client";

import type { RefObject } from "react";
import {
  SignupTermsConsent,
  type SignupTermsConsentHandle,
} from "@/components/auth/SignupTermsConsent";
import {
  AUTH_INPUT_CLASS_NAME,
  AUTH_SUBMIT_CLASS_NAME,
} from "@/components/auth/auth-form-styles";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";

type AuthFormFieldsProps = {
  mode: "login" | "signup";
  email: string;
  password: string;
  name: string;
  acceptedTerms: boolean;
  termsHighlighted: boolean;
  isActive: boolean;
  termsRef: RefObject<SignupTermsConsentHandle | null>;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onTermsChange: (checked: boolean) => void;
};

export function AuthFormFields({
  mode,
  email,
  password,
  name,
  acceptedTerms,
  termsHighlighted,
  isActive,
  termsRef,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onTermsChange,
}: AuthFormFieldsProps) {
  const t = useT();

  return (
    <>
      <div className="space-y-4">
        {mode === "signup" ? (
          <div className="space-y-2">
            <label htmlFor="auth-name" className="block text-sm text-zinc-400">
              {t("auth.name")}
            </label>
            <input
              id="auth-name"
              type="text"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              className={AUTH_INPUT_CLASS_NAME}
              data-testid={DataTestId.AuthNameInput}
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="auth-email" className="block text-sm text-zinc-400">
            {t("auth.email")}
          </label>
          <input
            id="auth-email"
            type="email"
            required
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className={AUTH_INPUT_CLASS_NAME}
            data-testid={DataTestId.AuthEmailInput}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="auth-password"
              className="block text-sm text-zinc-400"
            >
              {t("auth.password")}
            </label>
            {mode === "login" ? (
              <LocalizedLink
                href="/forgot-password"
                className="text-sm text-emerald-400 hover:underline"
                data-testid={DataTestId.ForgotPasswordLink}
              >
                {t("auth.forgotLink")}
              </LocalizedLink>
            ) : null}
          </div>
          <input
            id="auth-password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            className={AUTH_INPUT_CLASS_NAME}
            data-testid={DataTestId.AuthPasswordInput}
          />
        </div>
      </div>

      {mode === "signup" ? (
        <SignupTermsConsent
          ref={termsRef}
          accepted={acceptedTerms}
          highlighted={termsHighlighted}
          onAcceptedChange={onTermsChange}
        />
      ) : null}

      <div className="mt-6">
        <button
          type="submit"
          disabled={isActive}
          data-testid={
            mode === "signup"
              ? DataTestId.SignupSubmitButton
              : DataTestId.LoginSubmitButton
          }
          className={AUTH_SUBMIT_CLASS_NAME}
        >
          {mode === "login" ? t("auth.submitLogin") : t("auth.submitSignup")}
        </button>
      </div>
    </>
  );
}
