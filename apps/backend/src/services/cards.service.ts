import { CardsRepository } from "../repositories/cards.repository";
import type { Pagination } from "../types/pagination";

export const CardsService = {
  getHottest() {
    return CardsRepository.getHottest();
  },

  getCardById(id: string) {
    return CardsRepository.getCardById(id);
  },
};
