import { createEnv } from '@t3-oss/env-nextjs'
import 'dotenv/config'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.url(),
    JWT_SECRET_KEY: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH_URL: z.url(),
  },
  client: {},
  shared: {
    LOCAL: z.enum(['DEV', 'PROD']),
    APP_URL: z.url(),
  },
  runtimeEnv: {
    LOCAL: process.env.LOCAL,
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_OAUTH_URL: process.env.GITHUB_OAUTH_URL,
    APP_URL: process.env.APP_URL,
  },
  emptyStringAsUndefined: true,
})
