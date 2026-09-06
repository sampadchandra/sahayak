import { desc } from 'drizzle-orm'
import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const conversation = pgTable('conversation', {
  id: text('id').primaryKey(),
  bookingId: text('bookingId').notNull(),
  customerId: text('customerId').notNull(),
  workerId: text('workerId').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (table) => ({
  customerUpdatedIdx: index('conversation_customer_updated_idx').on(table.customerId, desc(table.updatedAt)),
  workerUpdatedIdx: index('conversation_worker_updated_idx').on(table.workerId, desc(table.updatedAt)),
}))

export const message = pgTable('message', {
  id: text('id').primaryKey(),
  conversationId: text('conversationId').notNull(),
  senderId: text('senderId').notNull(),
  body: text('body'),
  messageType: text('messageType').notNull().default('text'),
  locationUrl: text('locationUrl'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
}, (table) => ({
  conversationCreatedIdx: index('message_conversation_created_idx').on(table.conversationId, table.createdAt),
}))

export type ChatMessage = typeof message.$inferSelect
