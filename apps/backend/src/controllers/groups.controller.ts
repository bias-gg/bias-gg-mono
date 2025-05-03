import { GroupsRepository } from "../repositories/groups.repository";
import type { Pagination } from "../types/pagination";

export const GroupsController = {
  getGroups: (pagination: Pagination) => {
    return GroupsRepository.getGroups(pagination);
  },

  getGroupById(id: number) {
    return GroupsRepository.getGroupById(id);
  },

  getGroupByName(name: string) {
    return GroupsRepository.getGroupByName(name);
  },
};
