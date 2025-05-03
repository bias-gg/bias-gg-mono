import type Elysia from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { isAdmin } from "../auth/utils/isAdmin";

export const authMiddleware = (app: Elysia) =>
  app.use(clerkPlugin()).resolve(async ({ auth, error, clerk }) => {
    console.log("userId", auth?.userId ?? "no user id");
    if (!auth?.userId) {
      return error(401, "Unauthorized");
    }

    const user = await clerk.users.getUser(auth.userId);

    console.log("user", user ?? "no user");

    if (!user) {
      return error(401, "Unauthorized");
    }

    return { user };
  });

export const authAdminMiddleware = (app: Elysia) =>
  app.use(authMiddleware).resolve(async ({ error, user }) => {
    if (!isAdmin(user)) {
      return error(401, "Unauthorized");
    }

    return { user };
  });
