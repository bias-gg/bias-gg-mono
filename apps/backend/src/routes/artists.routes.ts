import { t, Elysia } from "elysia";
import { idAsNumberValidator, paginationValidator } from "./utils/validation";
import { ArtistsRepository } from "../repositories/artists.repository";

export const artistRoutes = new Elysia({ prefix: "/artists" })
  .get(
    "/",
    ({ query: { page, limit } }) =>
      ArtistsRepository.getArtists({ page, limit }),
    {
      query: t.Object({
        ...paginationValidator,
      }),
    },
  )
  .get("/:id", ({ params }) => ArtistsRepository.getArtistById(params.id), {
    params: t.Object({
      ...idAsNumberValidator,
    }),
  })
  .put(
    "/:id",
    ({ params, body }) => {
      return ArtistsRepository.updateArtistById(params.id, body);
    },
    {
      params: t.Object({
        ...idAsNumberValidator,
      }),
      body: t.Object({
        name: t.String(),
      }),
    },
  )
  .delete(
    "/:id",
    ({ params }) => {
      return ArtistsRepository.deleteArtistById(params.id);
    },
    {
      params: t.Object({
        ...idAsNumberValidator,
      }),
    },
  );
