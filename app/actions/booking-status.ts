'use server'

import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'node:crypto'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking } from '@/lib/db/schema'
import { alert } from '@/lib/db/alert-schema'
import { workerProfile } from '@/lib/db/worker-schema'

const transitions: Record<string, string[]> = { REQUESTED: ['CONFIRMED', 'CANCELLED'], CONFIRMED: ['IN_PROGRESS', 'CANCELLED'], IN_PROGRESS: ['COMPLETED'] }

async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export async function updateBookingStatus(bookingId: string, nextStatus: string) {
  const user = await currentUser()
  if (!Object.keys(transitions).includes(nextStatus)) throw new Error('Invalid booking status')
  const [row] = await db.select().from(booking).where(eq(booking.id, bookingId)).limit(1)
  if (!row) throw new Error('Booking not found')
  const [currentWorker] = await db.select().from(workerProfile).where(eq(workerProfile.userId, user.id)).limit(1)
  const [assignedWorker] = row.workerId ? await db.select().from(workerProfile).where(eq(workerProfile.id, row.workerId)).limit(1) : []
  const isCustomer = row.userId === user.id
  const isWorker = currentWorker?.id === row.workerId
  if (!isCustomer && !isWorker) throw new Error('You cannot update this booking')
  if (!transitions[row.status]?.includes(nextStatus)) throw new Error('Invalid status transition')
  if (isCustomer && nextStatus !== 'CANCELLED') throw new Error('Customers can only cancel bookings')
  if (isWorker && nextStatus === 'CANCELLED') throw new Error('Workers cannot cancel bookings')
  await db.update(booking).set({ status: nextStatus, updatedAt: new Date() }).where(and(eq(booking.id, bookingId), isCustomer ? eq(booking.userId, user.id) : eq(booking.workerId, currentWorker?.id ?? '')))
  const recipientId = isCustomer ? assignedWorker?.userId : row.userId
  if (recipientId && recipientId !== user.id) await db.insert(alert).values({ id: randomUUID(), userId: recipientId, bookingId, type: `BOOKING_${nextStatus}`, title: `Booking ${nextStatus.toLowerCase().replace('_', ' ')}`, body: `Your booking status is now ${nextStatus.toLowerCase().replace('_', ' ')}.` })
  revalidatePath('/dashboard')
  revalidatePath('/account')
}
