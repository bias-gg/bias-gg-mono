import { CardsRepository } from "../repositories/cards.repository";
import type { Pagination } from "../types/pagination";

export const CardsService = {
  getHottest(pagination: Pagination) {
    return CardsRepository.getHottest(pagination);
  },

  getCardById(id: string) {
    return CardsRepository.getCardById(id);
  },
};
