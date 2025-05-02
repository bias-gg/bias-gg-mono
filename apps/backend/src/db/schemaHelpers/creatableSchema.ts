import { timestamp } from "drizzle-orm/pg-core";

export const creatable = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
};
