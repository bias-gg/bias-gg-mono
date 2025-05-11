import Elysia, { t } from "elysia";
import { idAsNumberValidator } from "./utils/validation";
import { CardsRepository } from "../repositories/cards.repository";

export const cardRoutes = new Elysia({ prefix: "/cards" })
  .get(
    "/hottest",
    ({ query: { limit } }) => CardsRepository.getHottest(limit),
    {
      query: t.Object({
        limit: t.Number({
          default: 10,
          maximum: 50,
          minimum: 1,
        }),
      }),
    },
  )
  .get("/:id", ({ params }) => CardsRepository.getCardById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  });
