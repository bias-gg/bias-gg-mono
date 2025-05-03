import { db } from "../db/client";
import { groups } from "../db/schema";
import type { Pagination } from "../types/pagination";
import { eq } from "drizzle-orm";
import { GroupSchema, type Group } from "@repo/types/groups/GroupType.ts";
import { withPagination } from "./utils/queries/withPagination";
import { withIdFilter } from "./utils/queries/withIdFilter";

export const GroupsRepository = {
  getGroups: async (pagination: Pagination): Promise<Group[]> => {
    const groupsFromDb = await withPagination(
      db.select().from(groups).$dynamic(),
      pagination,
    );
    return groupsFromDb.map((group) => GroupSchema.parse(group));
  },

  getGroupById: async (id: number): Promise<Group | undefined> => {
    const groupFromDb = await withIdFilter(
      db.select().from(groups).$dynamic(),
      groups.id,
      id,
    );
    return groupFromDb.length > 0
      ? GroupSchema.parse(groupFromDb[0])
      : undefined;
  },

  getGroupByName: async (name: string): Promise<Group | undefined> => {
    const groupFromDb = await db
      .select()
      .from(groups)
      .where(eq(groups.name, name))
      .limit(1);
    return groupFromDb.length > 0
      ? GroupSchema.parse(groupFromDb[0])
      : undefined;
  },
};
