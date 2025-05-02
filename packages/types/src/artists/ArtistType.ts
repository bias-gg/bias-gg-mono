import { creatableSchema } from "../Creatable";
import * as z from "zod";

export const ArtistSchema = z
  .object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    followers: z.number().nonnegative(),
  })
  .extend(creatableSchema);

export type Artist = z.infer<typeof ArtistSchema>;
