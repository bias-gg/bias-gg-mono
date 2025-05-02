import type Elysia from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const authMiddleware = (app: Elysia) =>
  app.use(clerkPlugin()).resolve(async ({ auth, error, clerk }) => {
    if (!auth?.userId) {
      return error(401, "Unauthorized");
    }

    const user = await clerk.users.getUser(auth.userId);

    if (!user) {
      return error(401, "Unauthorized");
    }

    return { user };
  });
