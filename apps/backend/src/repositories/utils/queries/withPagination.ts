import type { PgSelect } from "drizzle-orm/pg-core";
import type { Pagination } from "../../../types/pagination";

const calculateOffset = ({ page, limit }: Pagination): number =>
	(page - 1) * limit;

export const withPagination = <T extends PgSelect>(
	query: T,
	pagination: Pagination,
) => {
	const { limit } = pagination;

	return query.limit(limit).offset(calculateOffset(pagination));
};
