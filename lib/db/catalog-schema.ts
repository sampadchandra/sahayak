import { boolean, index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const serviceCatalog = pgTable('service_catalog', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  priceLabel: text('price_label').notNull(),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({ activeIdx: index('service_catalog_active_idx').on(table.active, table.name) }))

export type ServiceCatalogItem = typeof serviceCatalog.$inferSelect
