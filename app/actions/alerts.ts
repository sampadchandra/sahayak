'use server'

import { and, desc, eq, isNull } from 'drizzle-orm'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { alert } from '@/lib/db/alert-schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getMyAlerts() {
  const userId = await getUserId()
  return db.select().from(alert).where(eq(alert.userId, userId)).orderBy(desc(alert.createdAt))
}

export async function getUnreadAlertCount() {
  const userId = await getUserId()
  const rows = await db.select({ id: alert.id }).from(alert).where(and(eq(alert.userId, userId), isNull(alert.readAt)))
  return rows.length
}
