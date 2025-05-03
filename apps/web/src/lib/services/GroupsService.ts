import { Group } from "@repo/types/groups/GroupType.ts";

export const GroupsService = {
  getGroups: async (): Promise<Group[]> =>
    fetch("http://localhost:3000/groups").then((res) => res.json()),
  getGroupById: async (id: string | number  ): Promise<Group> =>
    fetch(`http://localhost:3000/groups/${id}`).then((res) => res.json()),
};
