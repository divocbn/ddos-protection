import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/** note(module): 
 * Environment variables are split across packages to prevent leakage of sensitive data
 * between different parts of the monorepo. Each package only has access to the environment variables
 * it specifically needs, following the principle of least privilege.
 */
export const env = createEnv({
  server: {
    REDIS_URL: z.string(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});