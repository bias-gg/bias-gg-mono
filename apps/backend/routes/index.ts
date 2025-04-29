import { Elysia } from "elysia";
import { cardRoutes } from "./cards.routes";

export const setupRoutes = (app: Elysia) => {
  return app
    .get('/', () => 'API is running')
    .use(cardRoutes)
    // Add other routes as your API grows
    // .use(userRoutes)
};
