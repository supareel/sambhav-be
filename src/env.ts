import { z } from "zod";

const envSchema = z.object({
  PORT: z.number().default(4040),
});

export const env = envSchema.parse(process.env);
