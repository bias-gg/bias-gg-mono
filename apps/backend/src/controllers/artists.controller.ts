import type { Pagination } from "../types/pagination";
import { ArtistsService } from "../services/artists.service";

export const ArtistsController = {
  list(pagination: Pagination) {
    return ArtistsService.getArtists(pagination);
  },

  getArtistById(id: number) {
    return ArtistsService.getArtistById(id);
  },
};
