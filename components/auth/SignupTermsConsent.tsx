"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";
import { LEGAL_PRIVACY_PATH, LEGAL_TERMS_PATH } from "@/lib/legal/constants";

export type SignupTermsConsentHandle = {
  focusError: () => void;
};

type SignupTermsConsentProps = {
  accepted: boolean;
  highlighted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
};

export const SignupTermsConsent = forwardRef<
  SignupTermsConsentHandle,
  SignupTermsConsentProps
>(function SignupTermsConsent(
  { accepted, highlighted, onAcceptedChange },
  ref,
) {
  const t = useT();
  const blockRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusError: () => {
      requestAnimationFrame(() => {
        blockRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        checkboxRef.current?.focus();
      });
    },
  }));

  return (
    <div
      ref={blockRef}
      data-testid={DataTestId.SignupTermsBlock}
      className={`mt-4 flex items-start gap-3 rounded-lg text-sm text-zinc-400 transition-shadow ${
        highlighted
          ? "p-2 -mx-2 ring-2 ring-red-500/80 ring-offset-2 ring-offset-zinc-950"
          : ""
      }`}
    >
      <label htmlFor="auth-terms" className="mt-0.5 shrink-0 cursor-pointer">
        <input
          ref={checkboxRef}
          id="auth-terms"
          type="checkbox"
          checked={accepted}
          onChange={(event) => onAcceptedChange(event.target.checked)}
          data-testid={DataTestId.SignupTermsCheckbox}
          className="rounded border-zinc-600 bg-zinc-900"
          aria-label={t("auth.termsAgree")}
        />
      </label>
      <span>
        {t("auth.termsAgree")}{" "}
        <LocalizedLink
          href={LEGAL_TERMS_PATH}
          data-testid={DataTestId.SignupTermsLink}
          className="text-emerald-400 hover:underline"
        >
          {t("legal.termsTitle")}
        </LocalizedLink>
        {" · "}
        <LocalizedLink
          href={LEGAL_PRIVACY_PATH}
          data-testid={DataTestId.SignupPrivacyLink}
          className="text-emerald-400 hover:underline"
        >
          {t("legal.privacyTitle")}
        </LocalizedLink>
      </span>
    </div>
  );
});
