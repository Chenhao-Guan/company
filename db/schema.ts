import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// Admin users table
export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at').notNull().default(sql`strftime('%s', 'now')`),
  lastLogin: integer('last_login'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
})

// Products table
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull().default(''),
  image: text('image').notNull(),
  gradient: text('gradient').notNull().default('from-transparent to-transparent'),
  specifications: text('specifications').notNull(), // JSON array
  applications: text('applications').notNull(), // JSON array
  brands: text('brands').notNull(), // JSON array
  detailedDescription: text('detailed_description'),
  technicalSpecs: text('technical_specs'), // JSON object
  gallery: text('gallery'), // JSON array
  createdAt: integer('created_at').notNull().default(sql`strftime('%s', 'now')`),
  updatedAt: integer('updated_at').notNull().default(sql`strftime('%s', 'now')`),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
})

// News table
export const news = sqliteTable('news', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  date: text('date').notNull(), // ISO date string
  category: text('category').notNull(),
  categoryName: text('category_name').notNull(),
  image: text('image').notNull(),
  gradient: text('gradient').notNull().default('from-transparent to-transparent'),
  readTime: text('read_time').notNull(),
  author: text('author').notNull(),
  content: text('content').notNull(), // HTML content
  tags: text('tags'), // JSON array
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  gallery: text('gallery'), // JSON array
  contentImages: text('content_images'), // JSON array of objects
  createdAt: integer('created_at').notNull().default(sql`strftime('%s', 'now')`),
  updatedAt: integer('updated_at').notNull().default(sql`strftime('%s', 'now')`),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
})

// Home content table
export const homeContent = sqliteTable('home_content', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  section: text('section').notNull().unique(), // 'hero', 'about', 'product-overview', 'contact'
  title: text('title'),
  subtitle: text('subtitle'),
  description: text('description'),
  content: text('content'), // JSON for complex structured data
  image: text('image'),
  icon: text('icon'),
  orderIndex: integer('order_index').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at').notNull().default(sql`strftime('%s', 'now')`),
  updatedAt: integer('updated_at').notNull().default(sql`strftime('%s', 'now')`),
})

// Type exports for use in components
export type AdminUser = typeof adminUsers.$inferSelect
export type NewAdminUser = typeof adminUsers.$inferInsert

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export type News = typeof news.$inferSelect
export type NewNews = typeof news.$inferInsert

export type HomeContent = typeof homeContent.$inferSelect
export type NewHomeContent = typeof homeContent.$inferInsert
