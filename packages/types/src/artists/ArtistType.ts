import { creatableSchema } from "../Creatable";
import { idSchema } from "../Id";
import * as z from "zod";

export const ArtistSchema = z
  .object({
    id: z.number().nonnegative().min(1),
    name: z.string().nonempty(),
  })
  .extend(idSchema)
  .extend(creatableSchema);

export type Artist = z.infer<typeof ArtistSchema>;

export const isArtist = (value: unknown): value is Artist =>
  ArtistSchema.safeParse(value).success;
