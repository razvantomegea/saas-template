const UNSAFE_PATH = /[\u0000-\u001f\u007f\\ \t\n\r:#?%]|(?:\.\.)/;

export function resolveCallbackUrl(next: string | null): string {
  if (
    next?.startsWith("/") &&
    !next.startsWith("//") &&
    next !== "/" &&
    !UNSAFE_PATH.test(next)
  ) {
    return next;
  }

  return "/dashboard";
}
