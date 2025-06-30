import cors from "@elysiajs/cors";
import type Elysia from "elysia";

export const corsMiddleware = (app: Elysia) => app.use(cors({ origin: true }));
