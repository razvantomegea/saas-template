import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;
type Sql = ReturnType<typeof postgres>;

const globalForDb = globalThis as unknown as {
  sql?: Sql;
  db?: Database;
  connectionString?: string;
  poolGeneration?: number;
};

function getPoolGeneration(): number {
  return globalForDb.poolGeneration ?? 0;
}

function getSql(): Sql {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  if (globalForDb.sql && globalForDb.connectionString !== connectionString) {
    void globalForDb.sql.end({ timeout: 0 });
    globalForDb.sql = undefined;
    globalForDb.db = undefined;
    globalForDb.poolGeneration = getPoolGeneration() + 1;
  }

  if (!globalForDb.sql) {
    globalForDb.connectionString = connectionString;
    globalForDb.sql = postgres(connectionString, {
      prepare: false,
      ssl: "require",
      max: 3,
      idle_timeout: 20,
      max_lifetime: 60 * 10,
    });
  }

  return globalForDb.sql;
}

function getDb(): Database {
  if (!globalForDb.db) {
    globalForDb.db = drizzle({ client: getSql(), schema });
  }

  return globalForDb.db;
}

/** Current pool generation — used so stale retries do not reset a newer pool. */
export function getDbPoolGeneration(): number {
  return getPoolGeneration();
}

/**
 * Drop pooled connections after pooler-side closes (Supabase transaction pooler).
 * When `generation` is provided, only resets if it still matches the current pool.
 */
export function resetDbConnection(generation?: number): void {
  if (generation !== undefined && generation !== getPoolGeneration()) {
    return;
  }

  if (globalForDb.sql) {
    void globalForDb.sql.end({ timeout: 0 });
  }
  globalForDb.sql = undefined;
  globalForDb.db = undefined;
  globalForDb.connectionString = undefined;
  globalForDb.poolGeneration = getPoolGeneration() + 1;
}

export const db = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});
