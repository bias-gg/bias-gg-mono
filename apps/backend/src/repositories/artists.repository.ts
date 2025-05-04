import { ArtistSchema, type Artist } from "@repo/types/artists/ArtistType.ts";
import type { Pagination } from "../types/pagination";
import { db } from "../db/client";
import { artists, groupsToArtists } from "../db/schema";
import { calculateOffset } from "./utils/calculateOffset";
import { eq, getTableColumns } from "drizzle-orm";

type NewArtist = typeof artists.$inferInsert;

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
  updateArtistById: async (
    id: number,
    body: Partial<Artist>,
  ): Promise<Artist> => {
    const result = await db
      .update(artists)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(artists.id, id))
      .returning(getTableColumns(artists));

    return ArtistSchema.parse(result[0]);
  },
  deleteArtistById: async (id: number): Promise<Artist> => {
    const result = await db
      .delete(artists)
      .where(eq(artists.id, id))
      .returning(getTableColumns(artists));

    return ArtistSchema.parse(result[0]);
  },
  createArtist: async (body: NewArtist): Promise<Artist> => {
    const result = await db
      .insert(artists)
      .values({
        ...body,
        createdAt: new Date(),
      })
      .returning(getTableColumns(artists));

    return ArtistSchema.parse(result[0]);
  },
};
