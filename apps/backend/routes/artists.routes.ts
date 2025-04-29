
import { t, Elysia } from "elysia";
import { ArtistsController } from "../controllers/artists.controller";

export const artistRoutes = new Elysia({ prefix: "/artists" })
  .get("/", ({ query }) => ArtistsController.list(query.page, query.limit), {
    query: t.Object({
      page: t.Number({ default: 1, minimum: 1 }),
      limit: t.Number({ default: 10, minimum: 1, maximum: 100 }),
    }),
  })
  .get("/:id", ({ params }) => ArtistsController.getArtistById(params.id));
