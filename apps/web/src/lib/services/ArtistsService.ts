import type { Artist } from "@repo/types/artists/ArtistType.js";
import { getApiHost } from "../apiUtils";

export const updateArtist = async (
  token: string | null | undefined,
  id: string | number,
  body: Artist,
): Promise<Artist> =>
  fetch(`${getApiHost()}/artists/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const ArtistsService = {
  updateArtist,
};
