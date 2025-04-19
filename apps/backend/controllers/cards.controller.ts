
const DEMO_CARDS = [
  {
    id: "1",
    imageUrl: "https://placehold.co/300x400",
    name: "Jungkook",
    group: "BTS",
    album: "Proof",
    price: "$25.00",
    likes: 10,
  },
  {
    id: "2",
    imageUrl: "https://placehold.co/300x400",
    name: "Jennie",
    group: "BLACKPINK",
    album: "Born Pink",
    price: "$30.00",
    likes: 20,
  },
  {
    id: "3",
    imageUrl: "https://placehold.co/300x400",
    name: "Nayeon",
    group: "TWICE",
    album: "IM NAYEON",
    price: "$20.00",
    likes: 30,
  },
  // Add more demo cards here
];

export const CardsController = {
  getHottest() {
    return DEMO_CARDS;
  },

  getCardById(id: string) {
    return DEMO_CARDS.find((card) => card.id === id);
  },
};
