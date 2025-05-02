import type { Artist } from "@repo/types/artists/ArtistType.js";
import type { Pagination } from "../types/pagination";


export const ArtistsRepository = {
  getArtists: (pagination: Pagination): Artist[] => {
    return DEMO_ARTISTS.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit);
  },

  getArtistById: (id: string): Artist | undefined => {
    return DEMO_ARTISTS.find((artist) => artist.id === id);
  },
};
