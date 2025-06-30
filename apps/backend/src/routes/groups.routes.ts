import Elysia, { t } from "elysia";
import { authOptionalMiddleware } from "../middleware/auth";
import { ArtistsRepository } from "../repositories/artists.repository";
import { GroupsRepository } from "../repositories/groups.repository";
import { MembersRepository } from "../repositories/members.repository";
import { GroupsService } from "../services/groups.service";
import { idAsNumberValidator, paginationValidator } from "./utils/validation";

export const groupRoutes = new Elysia({ prefix: "/groups" })
	.use(authOptionalMiddleware)
	.get(
		"/",
		({ query: { page, limit }, user }) =>
			GroupsService.list({ page, limit }, user?.id),
		{
			query: t.Object({
				...paginationValidator,
			}),
		},
	)
	.get(
		"/hottest",
		({ query: { limit }, user }) =>
			GroupsRepository.getHottest(limit, user?.id),
		{
			query: t.Object({
				limit: t.Number({ default: 10, maximum: 50, minimum: 1 }),
			}),
		},
	)
	.get(
		"/:id",
		({ params, user }) => GroupsRepository.getGroupById(params.id, user?.id),
		{
			params: t.Object({
				...idAsNumberValidator,
			}),
		},
	)
	.get(
		"/:id/members",
		({ params }) => MembersRepository.getMembersByGroupId(params.id),
		{
			params: t.Object({
				...idAsNumberValidator,
			}),
		},
	);
