import type { Artist } from "@repo/types/artists/ArtistType.ts";
import { getApiHost } from "../apiUtils";

export const MembersService = {
  getMembersForGroup: async (groupId: string | number): Promise<Artist[]> => 
    fetch(`${getApiHost()}/groups/${groupId}/members`).then(res => res.json()),
};
