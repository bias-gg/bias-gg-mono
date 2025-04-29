import * as z from "zod";

export const ArtistSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  imageUrl: z.string().nonempty(),
  followers: z.number().nonnegative(),
});

export type Artist = z.infer<typeof ArtistSchema>;
