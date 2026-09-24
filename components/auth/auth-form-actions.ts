import { authClient } from "@/lib/better-auth/client";

const SESSION_COOKIE_ERROR =
  "Sign-in succeeded but session cookie was not set. Check browser privacy settings or try again.";

export type AuthActionResult =
  | { type: "redirect"; url: string }
  | { type: "error"; message: string };

type EmailAuthParams = {
  mode: "login" | "signup";
  email: string;
  password: string;
  name: string;
  callbackURL: string;
};

type GoogleAuthParams = {
  callbackURL: string;
  errorCallbackURL: string;
};

export async function performEmailAuth(
  params: EmailAuthParams,
): Promise<AuthActionResult> {
  try {
    if (params.mode === "signup") {
      const result = await authClient.signUp.email({
        email: params.email,
        password: params.password,
        name: params.name || params.email.split("@")[0] || "User",
      });
      if (result.error) {
        return {
          type: "error",
          message: result.error.message ?? "Sign up failed",
        };
      }
    } else {
      const result = await authClient.signIn.email({
        email: params.email,
        password: params.password,
      });
      if (result.error) {
        return {
          type: "error",
          message: result.error.message ?? "Sign in failed",
        };
      }
    }

    const session = await authClient.getSession({
      query: { disableCookieCache: true },
    });
    if (!session.data?.user) {
      return { type: "error", message: SESSION_COOKIE_ERROR };
    }

    return { type: "redirect", url: params.callbackURL };
  } catch {
    return {
      type: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function performGoogleAuth(
  params: GoogleAuthParams,
): Promise<AuthActionResult> {
  try {
    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: params.callbackURL,
      errorCallbackURL: params.errorCallbackURL,
    });

    if (result.error) {
      return {
        type: "error",
        message: result.error.message ?? "Google sign-in failed",
      };
    }

    const redirectUrl = result.data?.url;
    if (!redirectUrl) {
      return { type: "error", message: "Google sign-in failed" };
    }

    return { type: "redirect", url: redirectUrl };
  } catch {
    return {
      type: "error",
      message:
        "Google sign-in failed. Try Chrome or Firefox, or disable privacy extensions.",
    };
  }
}
