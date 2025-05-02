import { Elysia } from "elysia";
import { setupRoutes } from "./routes/index";
import cors from "@elysiajs/cors";

const app = setupRoutes(new Elysia()
  .use(
    cors({
      origin: true,
    }),
  ));

app.listen(3000);

console.log("🚀 Server ready at http://localhost:3000");
