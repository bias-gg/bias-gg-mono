import Elysia from "elysia";
import { CardsController } from "../controllers/cards.controller";

export const cardRoutes = new Elysia({ prefix: "/cards" })
  .get("/", () => CardsController.getHottest())
  .get("/:id", ({ params }) => CardsController.getCardById(params.id));
