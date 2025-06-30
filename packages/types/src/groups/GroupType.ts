import * as z from "zod";
import { creatableSchema } from "../Creatable";
import { idSchema } from "../Id";
import { likeableSchema } from "../Likeable";

export const GroupSchema = z
	.object({
		name: z.string().nonempty(),
		company: z.string().nonempty(),
	})
	.extend(idSchema)
	.extend(creatableSchema)
	.extend(likeableSchema);

export type Group = z.infer<typeof GroupSchema>;
