import type { Pagination } from "../../types/pagination";

export const calculateOffset = ({ page, limit }: Pagination): number =>
	(page - 1) * limit;
