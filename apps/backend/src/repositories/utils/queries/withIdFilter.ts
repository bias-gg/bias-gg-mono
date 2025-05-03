import { eq } from "drizzle-orm";
import type { PgColumn, PgSelect } from "drizzle-orm/pg-core";

export const withIdFilter = <T extends PgSelect, C extends PgColumn>(
  query: T,
  column: C,
  id: number,
) => {
  return query.where(eq(column, id)).limit(1);
};
