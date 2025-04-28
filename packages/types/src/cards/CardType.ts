import * as z from "zod";

export const CardSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  imageUrl: z.string().nonempty(),
  price: z.number().nonnegative(),
  group: z.string().nonempty(),
  album: z.string().nonempty(),
  likes: z.number().nonnegative(),
});

export type Card = z.infer<typeof CardSchema>;
