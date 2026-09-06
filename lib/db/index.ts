import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'
import * as catalogSchema from './catalog-schema'
import * as alertSchema from './alert-schema'

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool, { schema: { ...schema, ...catalogSchema, ...alertSchema } })
