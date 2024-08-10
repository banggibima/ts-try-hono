import { z } from "zod";

export const create = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});

export const update = z.object({
  username: z.string().min(4).optional(),
  password: z.string().min(6).optional(),
});
