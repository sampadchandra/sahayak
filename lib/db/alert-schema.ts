import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const alert = pgTable('alert', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  bookingId: text('booking_id'),
  type: text('type').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({ userCreatedIdx: index('alert_user_created_idx').on(table.userId, table.createdAt), userUnreadIdx: index('alert_user_unread_idx').on(table.userId, table.readAt) }))

export type Alert = typeof alert.$inferSelect
