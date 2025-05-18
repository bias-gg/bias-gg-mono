import Elysia, { t } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { GroupsRepository } from "../../repositories/groups.repository";
import { idAsNumberValidator, paginationValidator } from "../utils/validation";
import { MembersRepository } from "../../repositories/members.repository";

export const authGroupRoutes = new Elysia({ prefix: "/groups" })
  .use(authMiddleware)
  .get(
    "/liked",
    ({ user, query: { page, limit } }) =>
      GroupsRepository.getLikedGroups(user.id, { page, limit }),
    {
      query: t.Object({
        ...paginationValidator,
      }),
    },
  )
  .post(
    "/:id/follow",
    ({ params, user }) => {
      console.log("follow route");
      return GroupsRepository.addLikedGroup(user.id, params.id);
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .delete(
    "/:id/follow",
    ({ params, user }) => {
      return GroupsRepository.removeLikedGroup(user.id, params.id);
    },
    {
      params: t.Object({
        id: t.Number(),
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
