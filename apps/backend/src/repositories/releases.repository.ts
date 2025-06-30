import {
	type Release,
	ReleaseSchema,
} from "@repo/types/releases/ReleaseType.ts";
import { db } from "../db/client";
import { releases } from "../db/schema";
import type { Pagination } from "../types/pagination";
import { withPagination } from "./utils/queries/withPagination";

const query = db.select().from(releases).$dynamic();

export const ReleasesRepository = {
	getReleases: async (pagination: Pagination): Promise<Release[]> => {
		const releasesFromDb = await withPagination(query, pagination);
		return releasesFromDb.map((release) => ReleaseSchema.parse(release));
	},
};
