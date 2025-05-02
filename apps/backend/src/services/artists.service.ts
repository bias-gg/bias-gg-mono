import type { Artist } from "@repo/types/artists/ArtistType.js";
import { ArtistsRepository } from "../repositories/artists.repository";
import type { Pagination } from "../types/pagination";

export const ArtistsService = {
  getArtists(pagination: Pagination) {
    return ArtistsRepository.getArtists(pagination);
  },

  getArtistById(id: string) {
    return ArtistsRepository.getArtistById(id);
  },
};
