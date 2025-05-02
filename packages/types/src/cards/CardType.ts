import { creatableSchema } from "../Creatable";
import * as z from "zod";

export const CardSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty(),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  likes: z.number().nonnegative(),
}).extend(creatableSchema);

export type Card = z.infer<typeof CardSchema>;
