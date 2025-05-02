import type { User } from "elysia-clerk";
import { CardsService } from "../services/cards.service";


export const CardsController = {
  getHottest() {
    return CardsService.getHottest();
  },

  getCardById(id: number) {
    return CardsService.getCardById(id);
  },

  getCardsByUser(user: User) {
    return CardsService.getCardsByUser(user);
  },
};
