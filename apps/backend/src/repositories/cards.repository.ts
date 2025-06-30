import { type Card, CardSchema } from "@repo/types/cards/CardType.ts";
import { desc, eq, getTableColumns } from "drizzle-orm";
import type { User } from "elysia-clerk";
import { db } from "../db/client";
import {
	artists,
	artistsToCards,
	cards,
	groups,
	groupsToCards,
} from "../db/schema";

export const CardsRepository = {
	getHottest: async (limit = 10): Promise<Card[]> => {
		const cardsFromDb = await db
			.select({
				...getTableColumns(cards),
				artistId: artistsToCards.artistId,
				artistName: artists.name,
				groupId: groupsToCards.groupId,
				groupName: groups.name,
			})
			.from(cards)
			.innerJoin(artistsToCards, eq(artistsToCards.cardId, cards.id))
			.leftJoin(artists, eq(artists.id, artistsToCards.artistId))
			.innerJoin(groupsToCards, eq(groupsToCards.cardId, cards.id))
			.leftJoin(groups, eq(groups.id, groupsToCards.groupId))
			.orderBy(desc(cards.likes), desc(cards.createdAt))
			.limit(limit);

		return cardsFromDb.map((card) => CardSchema.parse(card));
	},

	getCardById: async (id: number): Promise<Card | undefined> => {
		const cardFromDb = await db
			.select({ cards, artists, groups })
			.from(cards)
			.leftJoin(artistsToCards, eq(artistsToCards.cardId, cards.id))
			.leftJoin(artists, eq(artists.id, artistsToCards.artistId))
			.leftJoin(groupsToCards, eq(groupsToCards.cardId, cards.id))
			.leftJoin(groups, eq(groups.id, groupsToCards.groupId))
			.where(eq(cards.id, id))
			.limit(1);

		return cardFromDb.length > 0 ? CardSchema.parse(cardFromDb[0]) : undefined;
	},

	getCardsByUser: async (user: User): Promise<Card[]> => {
		// TODO: Actually make this work
		const cardsFromDb = await db
			.select({ cards, artists, groups })
			.from(cards)
			.leftJoin(artistsToCards, eq(artistsToCards.cardId, cards.id))
			.leftJoin(artists, eq(artists.id, artistsToCards.artistId))
			.leftJoin(groupsToCards, eq(groupsToCards.cardId, cards.id))
			.leftJoin(groups, eq(groups.id, groupsToCards.groupId))
			.limit(10);

		return cardsFromDb.map((card) => CardSchema.parse(card));
	},
};
