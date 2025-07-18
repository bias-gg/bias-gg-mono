import { ReleaseTypes } from "@repo/types/releases/ReleaseType.ts";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgSchema,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { creatable } from "./schemaHelpers/creatableSchema";

export const appSchema = pgSchema("app");

// Define base tables first

export const releaseType = appSchema.enum("release_type", ReleaseTypes);
export const releases = appSchema.table("releases", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  groupId: integer()
    .notNull()
    .references(() => artists.id),
  type: releaseType(),
  ...creatable,
});

export const cards = appSchema.table("cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  price: integer().notNull(),
  likes: integer().default(0),
  releaseId: integer()
    .notNull()
    .references(() => releases.id),
  ...creatable,
});

export const groups = appSchema.table("groups", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  company: varchar({ length: 255 }).notNull(),
  likes: integer().default(0),
  ...creatable,
});

export const likedGroups = appSchema.table("liked_groups", {
  groupId: integer()
    .notNull()
    .references(() => groups.id),
  userId: varchar({ length: 255 }).notNull(),
});

export const artists = appSchema.table("artists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  isSoloArtist: boolean().default(false),
  ...creatable,
});

// Define junction tables
export const groupsToCards = appSchema.table(
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

export const artistsToCards = appSchema.table(
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

export const groupsToArtists = appSchema.table(
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

// Define relations for cards
export const cardRelations = relations(cards, ({ many }) => ({
  groupsToCards: many(groupsToCards),
  artistsToCards: many(artistsToCards),
}));

// Define relations for groups
export const groupRelations = relations(groups, ({ many }) => ({
  groupsToCards: many(groupsToCards),
  groupsToArtists: many(groupsToArtists),
  likedGroups: many(likedGroups),
}));

export const likedGroupsRelations = relations(likedGroups, ({ one }) => ({
  group: one(groups, {
    fields: [likedGroups.groupId],
    references: [groups.id],
  }),
}));

// Define relations for artists
export const artistRelations = relations(artists, ({ many }) => ({
  artistsToCards: many(artistsToCards),
  groupsToArtists: many(groupsToArtists),
}));

// Define relations for junction tables
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
