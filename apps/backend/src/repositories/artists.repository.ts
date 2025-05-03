import { ArtistSchema, type Artist } from "@repo/types/artists/ArtistType.ts";
import type { Pagination } from "../types/pagination";
import { db } from "../db/client";
import { artists, groupsToArtists } from "../db/schema";
import { calculateOffset } from "./utils/calculateOffset";
import { eq, getTableColumns } from "drizzle-orm";

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

  getArtistByGroupId: async (groupId: number): Promise<Artist[]> => {
    const artistFromDb = await db
      .select(getTableColumns(artists))
      .from(groupsToArtists)
      .innerJoin(artists, eq(groupsToArtists.artistId, artists.id))
      .where(eq(groupsToArtists.groupId, groupId));

    return artistFromDb.map((artist) => ArtistSchema.parse(artist));
  },
};
