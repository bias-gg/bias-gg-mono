import Elysia, { t } from "elysia";
import { idAsNumberValidator, paginationValidator } from "./utils/validation";
import { GroupsRepository } from "../repositories/groups.repository";
import { ArtistsRepository } from "../repositories/artists.repository";
import { MembersRepository } from "../repositories/members.repository";
import { GroupsService } from "../services/groups.service";

export const groupRoutes = new Elysia({ prefix: "/groups" })
  .get(
    "/",
    ({ query: { page, limit } }) => GroupsService.list({ page, limit }),
    {
      query: t.Object({
        ...paginationValidator,
      }),
    },
  )
  .get(
    "/hottest",
    ({ query: { limit } }) => GroupsRepository.getHottest(limit),
    {
      query: t.Object({
        limit: t.Number({ default: 10, maximum: 50, minimum: 1 }),
      }),
    },
  )
  .get("/:id", ({ params }) => GroupsRepository.getGroupById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  })
  .get(
    "/:id/members",
    ({ params }) => MembersRepository.getMembersByGroupId(params.id),
    {
      params: t.Object({
        ...idAsNumberValidator,
      }),
    },
  );
