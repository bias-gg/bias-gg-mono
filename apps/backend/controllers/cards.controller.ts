import type { Card } from "@repo/types/cards/CardType.ts";

const DEMO_CARDS = [
  {
    id: "1",
    imageUrl: "https://placehold.co/300x400",
    name: "Jungkook",
    group: "BTS",
    album: "Proof",
    description: "Jungkook is the maknae of BTS",
    price: 245,
    likes: 10,
  },
  {
    id: "2",
    imageUrl: "https://placehold.co/300x400",
    name: "Jennie",
    group: "BLACKPINK",
    album: "Born Pink",
    description: "Jennie is from the group Blackpink",
    price: 40,
    likes: 20,
  },
  {
    id: "3",
    imageUrl: "https://placehold.co/300x400",
    name: "Nayeon",
    group: "TWICE",
    album: "IM NAYEON",
    description: "Nayeon is the main singer of TWICE",
    price: 35,
    likes: 30,
  },
  // Add more demo cards here
];

export const CardsController = {
  getHottest(): Card[] {
    return DEMO_CARDS;
  },

  getCardById(id: string) {
    return DEMO_CARDS.find((card) => card.id === id);
  },
};
