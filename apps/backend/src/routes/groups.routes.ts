import Elysia, { t } from "elysia";
import { idAsNumberValidator, paginationValidator } from "./utils/validation";
import { GroupsRepository } from "../repositories/groups.repository";

export const groupRoutes = new Elysia({ prefix: "/groups" })
  .get(
    "/",
    ({ query: { page, limit } }) => GroupsRepository.getGroups({ page, limit }),
    {
      query: t.Object({
        ...paginationValidator,
      }),
    },
  )
  .get("/:id", ({ params }) => GroupsRepository.getGroupById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  })
  .get("name/:name", ({ params }) => GroupsRepository.getGroupByName(params.name), {
    params: t.Object({
      name: t.String(),
    }),
  });
