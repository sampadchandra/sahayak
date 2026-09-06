'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking } from '@/lib/db/schema'
import { alert } from '@/lib/db/alert-schema'

async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  return session.user
}

export async function createBooking(formData: FormData) {
  const user = await requireUser()
  const service = String(formData.get('service') ?? '').trim()
  const location = String(formData.get('location') ?? '').trim()
  const notes = String(formData.get('notes') ?? '').trim()
  const scheduledForValue = String(formData.get('scheduledFor') ?? '').trim()

  if (!service || !location) throw new Error('Service and location are required')
  if (service.length > 120 || location.length > 240 || notes.length > 2000) throw new Error('Booking details are too long')

  const scheduledFor = scheduledForValue ? new Date(scheduledForValue) : null
  if (scheduledForValue && (!scheduledFor || Number.isNaN(scheduledFor.getTime()))) throw new Error('Invalid scheduled date')

  const bookingId = randomUUID()
  await db.insert(booking).values({
    id: bookingId,
    userId: user.id,
    service,
    location,
    notes: notes || null,
    scheduledFor,
    amount: null,
    status: 'REQUESTED',
  })
  await db.insert(alert).values({
    id: randomUUID(), userId: user.id, bookingId, type: 'BOOKING_REQUESTED',
    title: 'Booking request received', body: `Your ${service} request is now in the queue.`,
  })

  revalidatePath('/account')
  revalidatePath('/dashboard')
}

export async function getMyBookings() {
  const user = await requireUser()
  return db.select().from(booking).where(eq(booking.userId, user.id)).orderBy(desc(booking.createdAt))
}
