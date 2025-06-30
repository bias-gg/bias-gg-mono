export const getApiHost = (): string => "http://localhost:3000/api";

export const getPaginatedRoute = (
	path: string,
	page?: number,
	limit?: number,
): string => {
	const pathWithInitialSlash = path[0] === "/" ? path : path.padStart(1, "/");

	const urlWithoutParams = `${getApiHost()}${pathWithInitialSlash}`;

	const url = new URL(urlWithoutParams);

	if (page) {
		url.searchParams.set("page", page.toString());
	}

	if (limit) {
		url.searchParams.set("limit", limit.toString());
	}

	return url.toString();
};
