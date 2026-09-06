'use server'

import { asc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { serviceCatalog } from '@/lib/db/catalog-schema'

export async function getActiveServices() {
  return db.select().from(serviceCatalog).where(eq(serviceCatalog.active, true)).orderBy(asc(serviceCatalog.name))
}
