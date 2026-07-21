import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import pg from "pg";

const { Client } = pg;
const migrationDirectory = path.join(process.cwd(), "migrations");

function getDatabaseUrl() {
  const databaseUrl =
    process.env.DATABASE_MIGRATION_URL?.trim() || process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_MIGRATION_URL or DATABASE_URL must be configured.");
  }

  return databaseUrl;
}

function getSslConfig(connectionString) {
  if (process.env.DATABASE_SSL === "true") {
    return { rejectUnauthorized: false };
  }

  if (process.env.DATABASE_SSL === "false") {
    return undefined;
  }

  const sslMode = new URL(connectionString).searchParams.get("sslmode");

  if (sslMode === "require" || sslMode === "no-verify") {
    return { rejectUnauthorized: false };
  }

  if (sslMode === "verify-ca" || sslMode === "verify-full") {
    return true;
  }

  return undefined;
}

async function runMigrations() {
  const connectionString = getDatabaseUrl();
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 10_000,
    ssl: getSslConfig(connectionString),
    statement_timeout: 60_000,
  });

  await client.connect();

  try {
    await client.query("SELECT pg_advisory_lock(hashtext('brandd_schema_migrations'))");
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const files = (await readdir(migrationDirectory))
      .filter((file) => /^\d+.*\.sql$/.test(file))
      .sort();
    const appliedResult = await client.query("SELECT name FROM schema_migrations");
    const applied = new Set(appliedResult.rows.map((row) => row.name));

    for (const file of files) {
      if (applied.has(file)) {
        continue;
      }

      const sql = await readFile(path.join(migrationDirectory, file), "utf8");

      await client.query("BEGIN");

      try {
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
        await client.query("COMMIT");
        process.stdout.write(`Applied ${file}\n`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }

    process.stdout.write("Database migrations are current.\n");
  } finally {
    await client.query("SELECT pg_advisory_unlock(hashtext('brandd_schema_migrations'))").catch(() => undefined);
    await client.end();
  }
}

runMigrations().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
