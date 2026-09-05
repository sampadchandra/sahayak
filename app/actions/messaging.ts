'use server'

import { randomUUID } from 'node:crypto'
import { and, asc, eq, or } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { conversation, message } from '@/lib/db/messaging-schema'

async function userId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function sendMessage(formData: FormData) {
  const senderId = await userId()
  const conversationId = String(formData.get('conversationId') ?? '')
  const body = String(formData.get('body') ?? '').trim()
  const locationUrl = String(formData.get('locationUrl') ?? '').trim()
  if (!conversationId || (!body && !locationUrl)) throw new Error('Message is required')
  const [chat] = await db.select().from(conversation).where(and(eq(conversation.id, conversationId), or(eq(conversation.customerId, senderId), eq(conversation.workerId, senderId))))
  if (!chat) throw new Error('Conversation not found')
  await db.insert(message).values({ id: randomUUID(), conversationId, senderId, body: body || null, messageType: locationUrl ? 'location' : 'text', locationUrl: locationUrl || null })
  revalidatePath(`/messages/${conversationId}`)
}

export async function getMessages(conversationId: string) {
  const currentUserId = await userId()
  const [chat] = await db.select().from(conversation).where(and(eq(conversation.id, conversationId), or(eq(conversation.customerId, currentUserId), eq(conversation.workerId, currentUserId))))
  if (!chat) throw new Error('Conversation not found')
  return db.select().from(message).where(eq(message.conversationId, conversationId)).orderBy(asc(message.createdAt))
}
