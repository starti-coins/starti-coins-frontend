import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_WEB_API_URL: z.string().url(),
});

const envData: z.infer<typeof envSchema> = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_WEB_API_URL: process.env.NEXT_PUBLIC_WEB_API_URL!, // Non-null assertion since we expect this to be set
};

const parsedEnv = envSchema.safeParse(envData);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
