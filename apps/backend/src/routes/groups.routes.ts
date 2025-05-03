import Elysia, { t } from "elysia";
import { GroupsController } from "../controllers/groups.controller";
import { idAsNumberValidator, paginationValidator } from "./utils/validation";

export const groupRoutes = new Elysia({ prefix: "/groups" })
  .get(
    "/",
    ({ query: { page, limit } }) => GroupsController.getGroups({ page, limit }),
    {
      query: t.Object({
        ...paginationValidator,
      }),
    },
  )
  .get("/:id", ({ params }) => GroupsController.getGroupById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  })
  .get("name/:name", ({ params }) => GroupsController.getGroupByName(params.name), {
    params: t.Object({
      name: t.String(),
    }),
  });
