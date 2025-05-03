import { Group } from "@repo/types/groups/GroupType.ts";
import { getApiHost } from "../apiUtils";

export const GroupsService = {
  getGroups: async (): Promise<Group[]> =>
    fetch(`${getApiHost()}/groups`).then((res) => res.json()),
  getGroupById: async (id: string | number  ): Promise<Group> =>
    fetch(`${getApiHost()}/groups/${id}`).then((res) => res.json()),
};
