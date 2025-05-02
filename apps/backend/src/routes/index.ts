import { Elysia } from "elysia";
import { cardRoutes } from "./cards.routes";
import { artistRoutes } from "./artists.routes";

export const setupRoutes = (app: Elysia) => {
  return app
    .get('/', () => ({ healthy: true }))
    .use(cardRoutes)
    .use(artistRoutes)
    // Add other routes as your API grows
    // .use(userRoutes)
};
