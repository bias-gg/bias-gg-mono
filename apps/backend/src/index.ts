import { Elysia } from "elysia";
import { corsMiddleware as cors } from "./middleware/cors";
import { swaggerMiddleware as swagger } from "./middleware/swagger";
import { setupRoutes as routes } from "./routes/index";

const _app = new Elysia()
  .use(swagger)
  .use(cors)
  .group("/api", (app) => app.use(routes))
  .listen(3000);

console.log("🚀 Server ready at http://localhost:3000");
