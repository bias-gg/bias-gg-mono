import { CardSchema, type Card } from "@repo/types/cards/CardType.ts";
import { db } from "../db/client";
import { cards } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import type { User } from "elysia-clerk";

export const CardsRepository = {
  getHottest: async (): Promise<Card[]> => {
    const cardsFromDb = await db
      .select()
      .from(cards)
      .orderBy(desc(cards.likes))
      .limit(10);

    return cardsFromDb.map((card) => CardSchema.parse(card));
  },

  getCardById: async (id: number): Promise<Card | undefined> => {
    const cardFromDb = await db
      .select()
      .from(cards)
      .where(eq(cards.id, id))
      .limit(1);

    return cardFromDb.length > 0 ? CardSchema.parse(cardFromDb[0]) : undefined;
  },

  getCardsByUser: async (user: User): Promise<Card[]> => {
    // TODO: Actually make this work
    const cardsFromDb = await db.select().from(cards).limit(10);

    return cardsFromDb.map((card) => CardSchema.parse(card));
  },
};
