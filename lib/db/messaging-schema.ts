import { text, timestamp } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const conversation = pgTable('conversation', {
  id: text('id').primaryKey(),
  bookingId: text('bookingId').notNull(),
  customerId: text('customerId').notNull(),
  workerId: text('workerId').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const message = pgTable('message', {
  id: text('id').primaryKey(),
  conversationId: text('conversationId').notNull(),
  senderId: text('senderId').notNull(),
  body: text('body'),
  messageType: text('messageType').notNull().default('text'),
  locationUrl: text('locationUrl'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export type ChatMessage = typeof message.$inferSelect
