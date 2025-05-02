import { ArtistSchema, type Artist } from "@repo/types/artists/ArtistType.ts";
import type { Pagination } from "../types/pagination";
import { db } from "../db/client";
import { artists } from "../db/schema";
import { calculateOffset } from "./utils/calculateOffset";
import { eq } from "drizzle-orm";

export const ArtistsRepository = {
  getArtists: async (pagination: Pagination): Promise<Artist[]> => {
    const artistsFromDb = await db
      .select()
      .from(artists)
      .limit(pagination.limit)
      .offset(calculateOffset(pagination));

    return artistsFromDb.map((artist) => ArtistSchema.parse(artist));
  },

  getArtistById: async (id: number): Promise<Artist | undefined> => {
    const artistFromDb = await db
      .select()
      .from(artists)
      .where(eq(artists.id, id))
      .limit(1);

    return artistFromDb.length > 0
      ? ArtistSchema.parse(artistFromDb[0])
      : undefined;
  },

  getArtistByName: async (name: string): Promise<Artist | undefined> => {
    const artistFromDb = await db
      .select()
      .from(artists)
      .where(eq(artists.name, name))
      .limit(1);

    return artistFromDb.length > 0
      ? ArtistSchema.parse(artistFromDb[0])
      : undefined;
  },
};
