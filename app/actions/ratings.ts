'use server'

import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking, workerRating } from '@/lib/db/schema'

async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export async function submitWorkerRating(formData: FormData) {
  const user = await requireUser()
  const bookingId = String(formData.get('bookingId') ?? '').trim()
  const workerId = String(formData.get('workerId') ?? '').trim()
  const rating = Number(formData.get('rating'))
  const review = String(formData.get('review') ?? '').trim()

  if (!bookingId || !workerId || !Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error('Choose a rating from 1 to 5 stars')
  if (review.length > 1000) throw new Error('Review is too long')

  const [ownedBooking] = await db.select({ id: booking.id }).from(booking).where(and(eq(booking.id, bookingId), eq(booking.userId, user.id), eq(booking.workerId, workerId), eq(booking.status, 'COMPLETED'))).limit(1)
  if (!ownedBooking) throw new Error('Only completed bookings can be rated')

  await db.insert(workerRating).values({ id: randomUUID(), bookingId, customerId: user.id, workerId, rating, review: review || null }).onConflictDoNothing({ target: workerRating.bookingId })
  revalidatePath('/dashboard')
  revalidatePath('/account')
}
