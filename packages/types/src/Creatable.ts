import { z } from "zod";

export const creatableSchema = {
  createdAt: z.date(),
  updatedAt: z.date().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
};
