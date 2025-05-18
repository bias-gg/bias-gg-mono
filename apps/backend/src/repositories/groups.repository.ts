import { db } from "../db/client";
import { groups, likedGroups } from "../db/schema";
import type { Pagination } from "../types/pagination";
import { eq, desc, getTableColumns, and } from "drizzle-orm";
import { GroupSchema, type Group } from "@repo/types/groups/GroupType.ts";
import { withPagination } from "./utils/queries/withPagination";
import { withIdFilter } from "./utils/queries/withIdFilter";

const getGroupCount = async (): Promise<number> => {
  const count = await db.$count(groups);
  return count;
};

const getGroups = async (
  pagination: Pagination,
  userId = "",
): Promise<Group[]> => {
  const groupsFromDb = await withPagination(
    db
      .select({
        ...getTableColumns(groups),
        liked: getTableColumns(likedGroups),
      })
      .from(groups)
      .leftJoin(
        likedGroups,
        and(eq(groups.id, likedGroups.groupId), eq(likedGroups.userId, userId)),
      )
      .$dynamic(),
    pagination,
  );

  return groupsFromDb
    .map((group) => ({
      ...group,
      liked: group.liked != null,
    }))
    .map((group) => GroupSchema.parse(group));
};

const getHottest = async (limit = 10, userId = ""): Promise<Group[]> => {
  const groupsFromDb = await db
    .select({
      ...getTableColumns(groups),
      liked: getTableColumns(likedGroups),
    })
    .from(groups)
    .leftJoin(
      likedGroups,
      and(eq(groups.id, likedGroups.groupId), eq(likedGroups.userId, userId)),
    )
    .orderBy(desc(groups.likes))
    .limit(limit);

  return groupsFromDb
    .map((group) => ({
      ...group,
      liked: group.liked != null,
    }))
    .map((group) => GroupSchema.parse(group));
};

const getGroupById = async (
  id: number,
  userId = "",
): Promise<Group | undefined> => {
  const groupFromDb = await withIdFilter(
    db
      .select({
        ...getTableColumns(groups),
        liked: getTableColumns(likedGroups),
      })
      .from(groups)
      .leftJoin(
        likedGroups,
        and(eq(groups.id, likedGroups.groupId), eq(likedGroups.userId, userId)),
      )
      .$dynamic(),
    groups.id,
    id,
  );

  return groupFromDb.length > 0
    ? GroupSchema.parse({
        ...groupFromDb[0],
        liked: groupFromDb[0]?.liked != null,
      })
    : undefined;
};

const getGroupByName = async (name: string): Promise<Group | undefined> => {
  const groupFromDb = await db
    .select()
    .from(groups)
    .where(eq(groups.name, name))
    .limit(1);
  return groupFromDb.length > 0 ? GroupSchema.parse(groupFromDb[0]) : undefined;
};

const getLikedGroups = async (
  userId: string,
  pagination: Pagination,
): Promise<Group[]> => {
  const groupsFromDb = await withPagination(
    db
      .select(getTableColumns(groups))
      .from(groups)
      .innerJoin(likedGroups, eq(groups.id, likedGroups.groupId))
      .where(eq(likedGroups.userId, userId))
      .orderBy(desc(groups.likes))
      .$dynamic(),
    pagination,
  );
  return groupsFromDb.map((group) => GroupSchema.parse(group));
};

const addLikedGroup = async (
  userId: string,
  groupId: number,
): Promise<Group> => {
  const groupFromDb = await getGroupById(groupId);

  if (!groupFromDb) {
    throw new Error("Group not found");
  }

  await db.insert(likedGroups).values({
    groupId,
    userId,
  });

  return groupFromDb;
};

const removeLikedGroup = async (
  userId: string,
  groupId: number,
): Promise<Group> => {
  const groupFromDb = await getGroupById(groupId);

  if (!groupFromDb) {
    throw new Error("Group not found");
  }

  await db
    .delete(likedGroups)
    .where(
      and(eq(likedGroups.groupId, groupId), eq(likedGroups.userId, userId)),
    );

  return groupFromDb;
};

const updateGroupById = async (
  id: number,
  body: Partial<Group>,
): Promise<Group> => {
  const groupFromDb = await getGroupById(id);

  if (!groupFromDb) {
    throw new Error("Group not found");
  }

  const result = await db
    .update(groups)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(groups.id, id))
    .returning(getTableColumns(groups));

  return GroupSchema.parse(result[0]);
};

const doesUserLikeGroup = async (
  userId: string,
  groupId: number,
): Promise<boolean> => {
  const likedGroup = await db
    .select()
    .from(likedGroups)
    .where(
      and(eq(likedGroups.userId, userId), eq(likedGroups.groupId, groupId)),
    );

  return likedGroup.length > 0;
};

export const GroupsRepository = {
  getGroupCount,
  getGroups,
  getHottest,
  getGroupById,
  getGroupByName,
  getLikedGroups,
  addLikedGroup,
  updateGroupById,
  removeLikedGroup,
};
