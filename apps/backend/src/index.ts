import { Elysia } from "elysia";
import { setupRoutes } from "./routes/index";
import cors from "@elysiajs/cors";
import { drizzle } from "drizzle-orm/node-postgres";

// #region HTTP SERVER

const app = new Elysia();
app.use(cors({
  origin: true,
}));

// #endregion HTTP SERVER

// #region ROUTES

setupRoutes(app);

// #endregion ROUTES

// #region DATABASE

const db = drizzle(process.env.DATABASE_URL!);

// #endregion DATABASE

// #region START SERVER
app.listen(3000);

console.log("🚀 Server ready at http://localhost:3000");

// #endregion START SERVER

