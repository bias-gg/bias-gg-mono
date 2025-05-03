import type Elysia from "elysia";
import cors from "@elysiajs/cors";

export const corsMiddleware = (app: Elysia) => app.use(cors({ origin: true }));
