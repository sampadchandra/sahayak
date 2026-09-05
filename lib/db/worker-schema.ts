import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const workerProfile = pgTable('worker_profile', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().unique(),
  fullName: text('fullName').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  primarySkill: text('primarySkill').notNull(),
  otherSkills: text('otherSkills'),
  experience: text('experience').notNull(),
  serviceArea: text('serviceArea').notNull(),
  languages: text('languages').notNull(),
  certifications: text('certifications'),
  cooperative: text('cooperative'),
  availability: text('availability').notNull(),
  profileStatus: text('profileStatus').notNull().default('PENDING_REVIEW'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
