import { type Artist, ArtistSchema } from "@repo/types/artists/ArtistType.ts";
import { and, eq, getTableColumns } from "drizzle-orm";
import { db } from "../db/client";
import { artists, groupsToArtists } from "../db/schema";
import { ArtistsRepository, type NewArtist } from "./artists.repository";

const getMembersByGroupId = async (groupId: number): Promise<Artist[]> => {
	const artistFromDb = await db
		.select(getTableColumns(artists))
		.from(groupsToArtists)
		.innerJoin(artists, eq(groupsToArtists.artistId, artists.id))
		.where(eq(groupsToArtists.groupId, groupId));

	return artistFromDb.map((artist) => ArtistSchema.parse(artist));
};

const createMember = async (
	groupId: number,
	body: NewArtist,
): Promise<Artist> => {
	const result = await ArtistsRepository.createArtist(body);

	await db.insert(groupsToArtists).values({
		groupId,
		artistId: result.id,
	});

	return result;
};

const deleteMember = async (
	groupId: number,
	memberId: number,
): Promise<{
	artistId: number;
	groupId: number;
} | null> => {
	const result = await db
		.delete(groupsToArtists)
		.where(
			and(
				eq(groupsToArtists.artistId, memberId),
				eq(groupsToArtists.groupId, groupId),
			),
		)
		.returning(getTableColumns(groupsToArtists));

	return result[0] ?? null;
};

export const MembersRepository = {
	getMembersByGroupId,
	createMember,
	deleteMember,
};
