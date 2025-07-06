import { Elysia, t } from "elysia";
import { ReleasesRepository } from "../repositories/releases.repository";
import { paginationValidator } from "./utils/validation";

export const releasesRoutes = new Elysia({ prefix: "/releases" }).get(
  "/",
  ({ query: { page, limit } }) =>
    ReleasesRepository.getReleases({ page, limit }),
  {
    query: t.Object({
      ...paginationValidator,
    }),
  },
);
