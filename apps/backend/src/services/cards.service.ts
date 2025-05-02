import type { User } from "elysia-clerk";
import { CardsRepository } from "../repositories/cards.repository";
import type { Pagination } from "../types/pagination";

export const CardsService = {
  getHottest() {
    return CardsRepository.getHottest();
  },

  getCardById(id: number) {
    return CardsRepository.getCardById(id);
  },

  getCardsByUser(user: User) {
    return CardsRepository.getCardsByUser(user);
  },
};
