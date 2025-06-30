import type { Artist } from "@repo/types/artists/ArtistType.ts";
import { getApiHost } from "../apiUtils";

export const MembersService = {
	getMembersForGroup: async (groupId: string | number): Promise<Artist[]> =>
		fetch(`${getApiHost()}/groups/${groupId}/members`).then((res) =>
			res.json(),
		),
	createMember: async (
		token: string | null | undefined,
		groupId: string | number,
		body: Artist,
	): Promise<Artist> =>
		fetch(`${getApiHost()}/groups/${groupId}/members/`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => res.json()),
	deleteMember: async (
		token: string | null | undefined,
		groupId: string | number,
		memberId: string | number,
	): Promise<Artist> =>
		fetch(`${getApiHost()}/groups/${groupId}/members/${memberId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => res.json()),
};
