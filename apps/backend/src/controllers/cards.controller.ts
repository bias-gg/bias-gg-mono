import type { Pagination } from "../types/pagination";
import { CardsService } from "../services/cards.service";


export const CardsController = {
  getHottest() {
    return CardsService.getHottest();
  },

  getCardById(id: string) {
    return CardsService.getCardById(id);
  },
};
