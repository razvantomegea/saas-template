const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  account_not_linked:
    "We couldn't link Google to your existing account. Use the same email as your password sign-up, or sign in with email and password.",
  unable_to_link_account:
    "We couldn't link your Google account. Try email and password sign-in.",
  email_not_found:
    "Google did not share an email address. Try email and password sign-in.",
  email_doesnt_match:
    "The Google email does not match your account. Use the same email or sign in with password.",
  account_already_linked_to_different_user:
    "This Google account is linked to another user.",
  signup_disabled:
    "New sign-ups are disabled. Sign in with email and password.",
  invalid_code: "Google sign-in expired. Please try again.",
  no_code: "Google sign-in was cancelled or failed. Please try again.",
};

export function mapOAuthError(
  error: string | null,
  description: string | null,
): string | null {
  if (!error) {
    return null;
  }

  const normalized = error.trim().toLowerCase();
  if (description?.trim()) {
    return description.trim();
  }

  return (
    OAUTH_ERROR_MESSAGES[normalized] ??
    "Google sign-in failed. Try email and password, or try again."
  );
}
