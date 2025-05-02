import { creatableSchema } from "../Creatable";
import * as z from "zod";

export const ArtistSchema = z
  .object({
    id: z.number().nonnegative().min(1),
    name: z.string().nonempty(),
  })
  .extend(creatableSchema);

export type Artist = z.infer<typeof ArtistSchema>;
