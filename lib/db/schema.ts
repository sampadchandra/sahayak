import { boolean, check, integer, index, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { desc, sql } from 'drizzle-orm'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  issuer: text('issuer'),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const workerRating = pgTable('worker_rating', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull(),
  customerId: text('customer_id').notNull(),
  workerId: text('worker_id').notNull(),
  rating: integer('rating').notNull(),
  review: text('review'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  bookingUnique: uniqueIndex('worker_rating_booking_unique').on(table.bookingId),
  customerIdx: index('worker_rating_customer_idx').on(table.customerId, desc(table.createdAt)),
  workerIdx: index('worker_rating_worker_idx').on(table.workerId, desc(table.createdAt)),
  valueCheck: check('worker_rating_value_valid', sql`${table.rating} BETWEEN 1 AND 5`),
}))

export const booking = pgTable('booking', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  service: text('service').notNull(),
  status: text('status').notNull().default('REQUESTED'),
  scheduledFor: timestamp('scheduledFor'),
  location: text('location').notNull(),
  notes: text('notes'),
  amount: integer('amount'),
  workerId: text('workerId'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (table) => ({
  userCreatedAtIdx: index('booking_user_created_at_idx').on(table.userId, desc(table.createdAt)),
  workerStatusIdx: index('booking_worker_status_idx').on(table.workerId, table.status),
  statusCheck: check('booking_status_valid', sql`${table.status} IN ('REQUESTED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')`),
}))
