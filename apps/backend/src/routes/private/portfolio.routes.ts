import Elysia from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { CardsRepository } from "../../repositories/cards.repository";

export const portfolioRoutes = new Elysia({ prefix: "/portfolio" })
  .use(authMiddleware)
  .get("/", ({ user }) => CardsRepository.getCardsByUser(user));
