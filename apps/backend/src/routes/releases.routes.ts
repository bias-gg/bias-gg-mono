import { t, Elysia } from "elysia";
import { paginationValidator } from "./utils/validation";
import { ReleasesRepository } from "../repositories/releases.repository";

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
