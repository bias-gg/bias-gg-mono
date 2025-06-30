import { t } from "elysia";

export const idAsNumberValidator = {
	id: t.Number(),
};

export const paginationValidator = {
	page: t.Number({ default: 1, minimum: 1 }),
	limit: t.Number({ default: 10, minimum: 1, maximum: 100 }),
};
