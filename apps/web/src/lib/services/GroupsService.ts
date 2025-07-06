import type { Group } from "@repo/types/groups/GroupType.ts";
import type { PaginatedResult } from "@repo/types/results/PaginatedResult.ts";
import { getApiHost, getPaginatedRoute } from "../apiUtils";

export const GroupsService = {
  getHottestGroups: async (
    limit = 10,
    token?: string | null | undefined,
  ): Promise<Group[]> =>
    fetch(`${getApiHost()}/groups/hottest?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),

  getGroups: async (
    page?: number,
    limit?: number,
    token?: string | null | undefined,
  ): Promise<PaginatedResult<Group>> =>
    fetch(getPaginatedRoute("/groups", page, limit), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),

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

  followGroup: async (
    token: string | null | undefined,
    id: string | number,
  ): Promise<Group> =>
    fetch(`${getApiHost()}/groups/${id}/follow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),

  unfollowGroup: (
    token: string | null | undefined,
    id: string | number,
  ): Promise<Group> =>
    fetch(`${getApiHost()}/groups/${id}/follow`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),
};
