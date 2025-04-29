import type { Artist } from "@repo/types/artists/ArtistType.ts";

const DEMO_ARTISTS: Artist[] = [
  {
    id: "1",
    name: "BTS",
    imageUrl: "https://placehold.co/300x400",
    followers: 10,
  },
  {
    id: "2",
    name: "BLACKPINK",
    imageUrl: "https://placehold.co/300x400",
    followers: 20,
  },
  {
    id: "3",
    name: "TWICE",
    imageUrl: "https://placehold.co/300x400",
    followers: 30,
  },
];

export const ArtistsController = {
  list(page = 1, limit = 10): Artist[] {
    return DEMO_ARTISTS.slice((page - 1) * limit, page * limit);
  },

  getArtistById(id: string) {
    return DEMO_ARTISTS.find((artist) => artist.id === id);
  },
};
