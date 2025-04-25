import * as z from "zod";

export const CardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
}); 

export type Card = z.infer<typeof CardSchema>;
