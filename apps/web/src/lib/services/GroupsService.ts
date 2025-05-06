import { Group } from "@repo/types/groups/GroupType.ts";
import { PaginatedResult } from "@repo/types/results/PaginatedResult.ts";
import { getApiHost, getPaginatedRoute } from "../apiUtils";

export const GroupsService = {
  getGroups: async (page?: number, limit?: number): Promise<PaginatedResult<Group>> =>
    fetch(getPaginatedRoute("/groups", page, limit)).then((res) => res.json()),
  getGroupById: async (id: string | number): Promise<Group> =>
    fetch(`${getApiHost()}/groups/${id}`).then((res) => res.json()),
  updateGroup: async (
    token: string | null | undefined,
    id: string | number,
    body: Partial<Group>,
  ): Promise<Group> =>
    fetch(`${getApiHost()}/groups/${id}`, {  
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),
};
