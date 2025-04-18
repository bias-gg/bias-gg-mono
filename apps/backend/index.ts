import { Elysia } from "elysia";
import { setupRoutes } from "./routes/index";

const app = new Elysia();

setupRoutes(app);

app.listen(3000);

console.log("🚀 Server ready at http://localhost:3000");

