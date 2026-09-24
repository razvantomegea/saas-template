import { authClient } from "@/lib/better-auth/client";

export type PasswordResetRequestResult =
  | { type: "success" }
  | { type: "error"; message: string };

export type PasswordResetSubmitResult =
  | { type: "success" }
  | { type: "error"; message: string };

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
      const message = result.error.message ?? "Failed to send reset email";
      if (isRateLimitedError(message)) {
        return {
          type: "error",
          message: "Too many requests. Please wait a moment and try again.",
        };
      }
      return { type: "error", message };
    }

    return { type: "success" };
  } catch {
    return {
      type: "error",
      message: "Something went wrong. Please try again.",
    };
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
        message: result.error.message ?? "Failed to reset password",
      };
    }

    return { type: "success" };
  } catch {
    return {
      type: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
