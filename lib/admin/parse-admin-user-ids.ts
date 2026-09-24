export function parseAdminUserIds(raw: string | undefined): Set<string> {
  if (!raw?.trim()) {
    return new Set();
  }

  return new Set(
    raw
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

export function isAdminUserId(
  userId: string,
  rawAdminIds: string | undefined = process.env.ADMIN_USER_IDS,
): boolean {
  const adminIds = parseAdminUserIds(rawAdminIds);
  return adminIds.size > 0 && adminIds.has(userId);
}
