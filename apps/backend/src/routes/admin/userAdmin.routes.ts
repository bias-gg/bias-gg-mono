import Elysia from "elysia";
import { isAdmin } from "../../auth/utils/isAdmin";
import { authAdminMiddleware } from "../../middleware/auth";

export const userAdminRoutes = new Elysia({ prefix: "/admin/users" })
  .use(authAdminMiddleware)
  .get("/", ({ clerk }) => clerk.users.getUserList())
  .get("/:id", ({ params, clerk }) => clerk.users.getUser(params.id))
  .get("/:id/isAdmin/", async ({ params, clerk }) => ({
    isAdmin: isAdmin(await clerk.users.getUser(params.id)),
  }))
  .put("/:id/role", ({ params, clerk, error }) => {
    const user = clerk.users.getUser(params.id);

    if (!user) {
      return error(404, "User not found");
    }

    return clerk.users.updateUser(params.id, {
      privateMetadata: { role: "admin" },
    });
  });
