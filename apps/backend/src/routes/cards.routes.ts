import Elysia, { t } from "elysia";
import { CardsController } from "../controllers/cards.controller";
import { idAsNumberValidator } from "./utils/validation";

export const cardRoutes = new Elysia({ prefix: "/cards" })
  .get("/hottest", () => CardsController.getHottest())
  .get("/:id", ({ params }) => CardsController.getCardById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  });
