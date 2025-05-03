import Elysia, { t } from "elysia";
import { idAsNumberValidator } from "./utils/validation";
import { CardsRepository } from "../repositories/cards.repository";

export const cardRoutes = new Elysia({ prefix: "/cards" })
  .get("/hottest", () => CardsRepository.getHottest())
  .get("/:id", ({ params }) => CardsRepository.getCardById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  });
