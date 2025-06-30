import * as z from "zod";

export const idSchema = {
	id: z.number().nonnegative().min(1),
};
