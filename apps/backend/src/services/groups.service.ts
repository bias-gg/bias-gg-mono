import type { Group } from "@repo/types/groups/GroupType.ts";
import type { PaginatedResult } from "@repo/types/results/PaginatedResult.ts";
import type { Pagination } from "../types/pagination";
import { GroupsRepository } from "../repositories/groups.repository";

const list = async (
  pagination: Pagination,
  userId?: string,
): Promise<PaginatedResult<Group>> => {
  const groups = await GroupsRepository.getGroups(pagination, userId);
  const total = await GroupsRepository.getGroupCount();

  return {
    data: groups,
    total,
    nextPage: pagination.page + 1,
    pages: Math.ceil(total / pagination.limit),
  };
};

export const GroupsService = {
  list,
};
