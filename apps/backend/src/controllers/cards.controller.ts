import type { Pagination } from "../types/pagination";
import { CardsService } from "../services/cards.service";


export const CardsController = {
  getHottest(pagination: Pagination) {
    return CardsService.getHottest(pagination);
  },

  getCardById(id: string) {
    return CardsService.getCardById(id);
  },
};
