import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { resolve } from "path";
import { resolveMigrateUrl, withSslMode } from "./lib/db/resolve-migrate-url";

// Next.js uses .env.local; drizzle-kit only loads .env by default
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: withSslMode(
      process.env.DB_MIGRATE_URL?.trim() ||
        resolveMigrateUrl({
          databaseUrl: process.env.DATABASE_URL?.trim(),
          directUrl: process.env.DIRECT_DATABASE_URL?.trim(),
        }),
    ),
  },
});
