import { Elysia } from "elysia";
import { setupRoutes as routes } from "./routes/index";
import { corsMiddleware as cors } from "./middleware/cors";
import { swaggerMiddleware as swagger } from "./middleware/swagger";
import { $ } from "bun";

const app = new Elysia()
  .use(swagger)
  .use(cors)
  .group("/api", (app) => app.use(routes))
  .listen(3000);

console.log("🚀 Server ready at http://localhost:3000");
