import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRE_URL,
  },
} satisfies Config
