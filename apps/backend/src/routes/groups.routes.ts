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
  )
  .put(
    "/:id",
    ({ params, body }) => GroupsRepository.updateGroupById(params.id, body),
    {
      params: t.Object({
        ...idAsNumberValidator,
      }),
      body: t.Object({
        name: t.String(),
        company: t.String(),
      }),
    },
  )
  .post(
    "/:id/members",
    ({ params, body }) => {
      return MembersRepository.createMember(params.id, body);
    },
    {
      params: t.Object({
        ...idAsNumberValidator,
      }),
      body: t.Object({
        name: t.String(),
      }),
    },
  )
  .delete(
    "/:id/members/:memberId",
    ({ params }) => {
      return MembersRepository.deleteMember(params.id, params.memberId);
    },
    {
      params: t.Object({
        ...idAsNumberValidator,
        memberId: t.Number(),
      }),
    },
  );
