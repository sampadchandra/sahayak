import { check, index, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

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
}, (table) => ({
  userIdUnique: uniqueIndex('worker_profile_userId_key').on(table.userId),
  statusSkillIdx: index('worker_profile_status_skill_idx').on(table.profileStatus, table.primarySkill),
  statusCheck: check('worker_profile_status_valid', sql`${table.profileStatus} IN ('PENDING_REVIEW', 'APPROVED', 'SUSPENDED', 'REJECTED')`),
}))
