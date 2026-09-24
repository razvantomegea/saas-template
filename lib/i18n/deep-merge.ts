/** Deep-merge message objects; `override` wins on leaf conflicts. */
export function deepMergeMessages<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown> | null | undefined,
): T {
  if (!override) {
    return base;
  }

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const existing = result[key];
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      existing !== null &&
      typeof existing === "object" &&
      !Array.isArray(existing)
    ) {
      result[key] = deepMergeMessages(
        existing as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result as T;
}

export function lookupMessagePath(
  messages: Record<string, unknown>,
  path: string,
): string | undefined {
  const parts = path.split(".").filter(Boolean);
  let current: unknown = messages;
  for (const part of parts) {
    if (
      current === null ||
      typeof current !== "object" ||
      Array.isArray(current) ||
      !(part in current)
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function formatMessage(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = vars[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}
