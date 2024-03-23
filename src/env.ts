import { z } from "zod";

const envSchema = z.object({
  PORT: z.number().default(4040),
  DATABASE_URI: z
    .string()
    .url()
    .trim()
    .min(1)
    .refine(
      (str: string) => str.includes("postgres://"),
      "You forgot to change the database url, please use postgres db url"
    ),
  PAYLOAD_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
