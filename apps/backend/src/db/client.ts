import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// Create and export the drizzle instance
export const db = drizzle(pool);
