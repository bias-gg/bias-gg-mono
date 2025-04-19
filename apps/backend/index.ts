import { Elysia } from "elysia";
import { setupRoutes } from "./routes/index";

// Enable HMR
import.meta.hot.accept();

const app = new Elysia();

setupRoutes(app);

app.listen(3000);

console.log("🚀 Server ready at http://localhost:3000");

