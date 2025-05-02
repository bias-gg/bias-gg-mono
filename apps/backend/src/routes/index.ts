import { Elysia } from "elysia";
import { cardRoutes } from "./cards.routes";
import { artistRoutes } from "./artists.routes";
import { portfolioRoutes } from "./private/portfolio.routes";

export const setupRoutes = (app: Elysia) => {
  return app
    .get('/', () => ({ healthy: true }))
    .use(cardRoutes)
    .use(artistRoutes)
    .use(portfolioRoutes)
};
