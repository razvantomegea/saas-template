type ResolveMigrateUrlParams = {
  databaseUrl?: string;
  directUrl?: string;
};

function mergeDirectOptionsIntoPoolerUrl(
  poolerUrl: string,
  directUrl: string,
): string {
  const db = new URL(poolerUrl);
  const directOptions = new URL(directUrl).searchParams.get("options");
  if (directOptions) {
    const poolerOptions = db.searchParams.get("options");
    db.searchParams.set(
      "options",
      poolerOptions ? `${poolerOptions} ${directOptions}` : directOptions,
    );
  }
  return db.toString();
}

function pickMigrateUrl(databaseUrl?: string, directUrl?: string): string {
  if (!databaseUrl) {
    return directUrl ?? "";
  }
  if (!directUrl) {
    return databaseUrl;
  }
  return mergeDirectOptionsIntoPoolerUrl(databaseUrl, directUrl);
}

export function resolveMigrateUrl({
  databaseUrl,
  directUrl,
}: ResolveMigrateUrlParams): string {
  const migrateUrl = pickMigrateUrl(databaseUrl, directUrl);
  if (!migrateUrl) {
    throw new Error("Set DATABASE_URL or DIRECT_DATABASE_URL for migrations");
  }
  return migrateUrl;
}

export function withSslMode(url: string): string {
  const parsed = new URL(url);
  if (!parsed.searchParams.has("sslmode")) {
    parsed.searchParams.set("sslmode", "require");
  }
  return parsed.toString();
}
