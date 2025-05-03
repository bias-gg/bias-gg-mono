import Elysia from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { CardsController } from "../../controllers/cards.controller";

export const portfolioRoutes = new Elysia({ prefix: "/portfolio" })
  .use(authMiddleware)
  .get("/", ({ user }) => CardsController.getCardsByUser(user));
