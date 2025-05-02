import { t, Elysia } from "elysia";
import { ArtistsController } from "../controllers/artists.controller";
import { idAsNumberValidator, paginationValidator } from "./utils/validation";

export const artistRoutes = new Elysia({ prefix: "/artists" })
  .get(
    "/",
    ({ query: { page, limit } }) => ArtistsController.list({ page, limit }),
    {
      query: t.Object({
        ...paginationValidator,
      }),
    },
  )
  .get("/:id", ({ params }) => ArtistsController.getArtistById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  });
