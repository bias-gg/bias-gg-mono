import { creatableSchema } from "../Creatable";
import { idSchema } from "../Id";
import * as z from "zod";

export const CardSchema = z
  .object({
    title: z.string().nonempty(),
    description: z.string().optional(),
    price: z.number().nonnegative().min(0),
    likes: z.number().nonnegative(),
  })
  .extend(idSchema)
  .extend(creatableSchema);

export type Card = z.infer<typeof CardSchema>;
