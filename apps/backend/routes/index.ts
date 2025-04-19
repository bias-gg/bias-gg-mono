import { Elysia } from "elysia";
import { testRoutes } from "./test.routes";
import { cardRoutes } from "./cards.routes";

export const setupRoutes = (app: Elysia) => {
  return app
    .get('/', () => 'API is running')
    .use(testRoutes)
    .use(cardRoutes)
    // Add other routes as your API grows
    // .use(userRoutes)
};
