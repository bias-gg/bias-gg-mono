import { Elysia } from "elysia";
import { TestController } from "../controllers/test.controller";

export const testRoutes = new Elysia({ prefix: "/test" })
  .get("/", () => TestController.get());
