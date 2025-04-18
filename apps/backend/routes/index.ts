import { Elysia } from "elysia";
import { testRoutes } from "./test.routes";

export const setupRoutes = (app: Elysia) => {
  return app
    .get('/', () => 'API is running')
    .use(testRoutes)
    // Add other routes as your API grows
    // .use(userRoutes)
};
