import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  album: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  price: integer().notNull(),
  likes: integer().default(0),
});

export const cardRelations = relations(cards, ({ many }) => ({
  groupsToCards: many(groupsToCards),
  artistsToCards: many(artistsToCards),
}));

export const groupsToCards = pgTable(
  "groups_to_cards",
  {
    groupId: integer()
      .notNull()
      .references(() => groups.id),
    cardId: integer()
      .notNull()
      .references(() => cards.id),
  },
  (t) => [primaryKey({ columns: [t.groupId, t.cardId] })],
);

export const groupsToCardsRelations = relations(groupsToCards, ({ one }) => ({
  group: one(groups, {
    fields: [groupsToCards.groupId],
    references: [groups.id],
  }),
  card: one(cards, {
    fields: [groupsToCards.cardId],
    references: [cards.id],
  }),
}));

export const artistsToCards = pgTable(
  "artists_to_cards",
  {
    artistId: integer()
      .notNull()
      .references(() => artists.id),
    cardId: integer()
      .notNull()
      .references(() => cards.id),
  },
  (t) => [primaryKey({ columns: [t.artistId, t.cardId] })],
);

export const artistsToCardsRelations = relations(artistsToCards, ({ one }) => ({
  artist: one(artists, {
    fields: [artistsToCards.artistId],
    references: [artists.id],
  }),
  card: one(cards, {
    fields: [artistsToCards.cardId],
    references: [cards.id],
  }),
}));

export const groups = pgTable("groups", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const groupRelations = relations(groups, ({ many }) => ({
  groupsToCards: many(groupsToCards),
  groupsToArtists: many(groupsToArtists),
}));

export const artists = pgTable("artists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  isSoloArtist: boolean().default(false),
  imageUrl: varchar({ length: 255 }).notNull(),
});

export const artistRelations = relations(artists, ({ many }) => ({
  artistsToCards: many(artistsToCards),
  groupsToArtists: many(groupsToArtists),
}));

export const groupsToArtists = pgTable(
  "groups_to_artists",
  {
    groupId: integer()
      .notNull()
      .references(() => groups.id),
    artistId: integer()
      .notNull()
      .references(() => artists.id),
  },
  (t) => [primaryKey({ columns: [t.groupId, t.artistId] })],
);

export const groupsToArtistsRelations = relations(
  groupsToArtists,
  ({ one }) => ({
    group: one(groups, {
      fields: [groupsToArtists.groupId],
      references: [groups.id],
    }),
    artist: one(artists, {
      fields: [groupsToArtists.artistId],
      references: [artists.id],
    }),
  }),
);
