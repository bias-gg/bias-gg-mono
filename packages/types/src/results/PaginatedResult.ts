export type PaginatedResult<T> = {
	data: T[];
	total: number;
	nextPage: number;
	pages: number;
};
