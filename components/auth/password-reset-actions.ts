import { authClient } from "@/lib/better-auth/client";

export type PasswordResetErrorCode =
  | "rate_limited"
  | "send_failed"
  | "reset_failed"
  | "generic";

export type PasswordResetRequestResult =
  | { type: "success" }
  | { type: "error"; code: PasswordResetErrorCode; message?: string };

export type PasswordResetSubmitResult =
  | { type: "success" }
  | { type: "error"; code: PasswordResetErrorCode; message?: string };

const PASSWORD_RESET_ERROR_KEYS: Record<PasswordResetErrorCode, string> = {
  rate_limited: "auth.rateLimited",
  send_failed: "auth.resetEmailFailed",
  reset_failed: "auth.resetFailed",
  generic: "auth.genericError",
};

/** Prefer the provider message for send/reset failures; otherwise use i18n. */
export function passwordResetErrorMessage(
  t: (path: string) => string,
  code: PasswordResetErrorCode,
  message?: string,
): string {
  const allowProviderMessage =
    code === "send_failed" || code === "reset_failed";
  return allowProviderMessage && message
    ? message
    : t(PASSWORD_RESET_ERROR_KEYS[code]);
}

function isRateLimitedError(message: string | undefined): boolean {
  if (!message) {
    return false;
  }
  return message.toLowerCase().includes("rate limit");
}

export async function requestPasswordResetEmail(params: {
  email: string;
  redirectTo: string;
}): Promise<PasswordResetRequestResult> {
  try {
    const result = await authClient.requestPasswordReset({
      email: params.email,
      redirectTo: params.redirectTo,
    });

    if (result.error) {
      const message = result.error.message;
      if (isRateLimitedError(message)) {
        return { type: "error", code: "rate_limited" };
      }
      return { type: "error", code: "send_failed", message };
    }

    return { type: "success" };
  } catch {
    return { type: "error", code: "generic" };
  }
}

export async function submitPasswordReset(params: {
  newPassword: string;
  token: string;
}): Promise<PasswordResetSubmitResult> {
  try {
    const result = await authClient.resetPassword({
      newPassword: params.newPassword,
      token: params.token,
    });

    if (result.error) {
      return {
        type: "error",
        code: "reset_failed",
        message: result.error.message,
      };
    }

    return { type: "success" };
  } catch {
    return { type: "error", code: "generic" };
  }
}
