import swagger from "@elysiajs/swagger";
import type Elysia from "elysia";

export const swaggerMiddleware = (app: Elysia) => {
  if (process.env.NODE_ENV === "development") {
    return app.use(swagger());
  }

  return app;
};
