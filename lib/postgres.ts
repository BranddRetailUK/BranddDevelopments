import { Pool, type PoolConfig } from "pg";

const globalForPostgres = globalThis as typeof globalThis & {
  branddPostgresPool?: Pool;
};

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

function getSslConfig(connectionString: string): PoolConfig["ssl"] {
  if (process.env.DATABASE_SSL === "true") {
    return { rejectUnauthorized: false };
  }

  if (process.env.DATABASE_SSL === "false") {
    return undefined;
  }

  try {
    const sslMode = new URL(connectionString).searchParams.get("sslmode");

    if (sslMode === "require" || sslMode === "no-verify") {
      return { rejectUnauthorized: false };
    }

    if (sslMode === "verify-ca" || sslMode === "verify-full") {
      return true;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function getPoolMax() {
  const configuredMax = Number(process.env.DATABASE_POOL_MAX);

  if (Number.isFinite(configuredMax) && configuredMax > 0) {
    return configuredMax;
  }

  return 5;
}

export function getPostgresPool() {
  if (globalForPostgres.branddPostgresPool) {
    return globalForPostgres.branddPostgresPool;
  }

  const connectionString = getDatabaseUrl();
  const ssl = getSslConfig(connectionString);

  globalForPostgres.branddPostgresPool = new Pool({
    connectionString,
    max: getPoolMax(),
    ssl,
  });

  return globalForPostgres.branddPostgresPool;
}
