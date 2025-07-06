import * as z from "zod";
import { creatableSchema } from "../Creatable";
import { idSchema } from "../Id";

export type ReleaseType = "album" | "single";
export const ReleaseTypes = ["album", "single"] as const;

export const ReleaseSchema = z
  .object({
    name: z.string().nonempty(),
    groupId: z.number().min(0),
    type: z.enum(ReleaseTypes),
  })
  .extend(idSchema)
  .extend(creatableSchema);

export type Release = z.infer<typeof ReleaseSchema>;
