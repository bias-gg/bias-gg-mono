import { Elysia } from "elysia";
import { setupRoutes } from "./routes/index";
import cors from "@elysiajs/cors";
import { drizzle } from "drizzle-orm/node-postgres";

const app = new Elysia();
app.use(cors({
  origin: true,
}));

setupRoutes(app);

app.listen(3000);

console.log("🚀 Server ready at http://localhost:3000");

