import * as z from "zod";

export const likeableSchema = {
  liked: z.boolean().default(false),
};
