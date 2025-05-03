import * as z from "zod";
import { creatableSchema } from "../Creatable";
import { idSchema } from "../Id";

export const GroupSchema = z
  .object({
    name: z.string().nonempty(),
    company: z.string().nonempty(),
  })
  .extend(idSchema)
  .extend(creatableSchema);

export type Group = z.infer<typeof GroupSchema>;
