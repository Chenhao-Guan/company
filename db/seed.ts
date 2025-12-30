import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '@/db/schema'
import { products as staticProducts, productCategories } from '../data/products'
import { news as staticNewsData, newsCategories } from '../data/news'
import bcrypt from 'bcryptjs'
import path from 'path'

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'database', 'xiamen-union.db')
const sqlite = new Database(dbPath)
const db = drizzle(sqlite, { schema })

async function migrateFromTypeScript() {
  console.log('Starting data migration...')

  // Migrate products
  console.log('Migrating products...')
  for (const product of staticProducts) {
    await db.insert(schema.products).values({
      id: product.id,
      title: product.title,
      category: product.category,
      description: product.description,
      icon: product.icon || '',
      image: product.image,
      gradient: product.gradient,
      specifications: JSON.stringify(product.specifications),
      applications: JSON.stringify(product.applications),
      brands: JSON.stringify(product.brands),
      detailedDescription: product.detailedDescription || null,
      technicalSpecs: product.technicalSpecs ? JSON.stringify(product.technicalSpecs) : null,
      gallery: product.gallery ? JSON.stringify(product.gallery) : null,
      published: true,
    }).onConflictDoNothing()
  }
  console.log(`Migrated ${staticProducts.length} products`)

  // Migrate news
  console.log('Migrating news...')
  for (const news of staticNewsData) {
    await db.insert(schema.news).values({
      id: news.id,
      title: news.title,
      excerpt: news.excerpt,
      date: news.date,
      category: news.category,
      categoryName: news.categoryName,
      image: news.image,
      gradient: news.gradient,
      readTime: news.readTime,
      author: news.author,
      content: news.content,
      tags: news.tags ? JSON.stringify(news.tags) : null,
      featured: news.featured || false,
      gallery: news.gallery ? JSON.stringify(news.gallery) : null,
      contentImages: news.contentImages ? JSON.stringify(news.contentImages) : null,
      published: true,
    }).onConflictDoNothing()
  }
  console.log(`Migrated ${staticNewsData.length} news items`)

  // Create default admin user (password: admin123)
  console.log('Creating default admin user...')
  const passwordHash = await bcrypt.hash('admin123', 12)

  await db.insert(schema.adminUsers).values({
    username: 'admin',
    passwordHash: passwordHash,
    isActive: true,
  }).onConflictDoNothing()

  console.log('\n=== Migration Summary ===')
  console.log(`Products: ${staticProducts.length}`)
  console.log(`News: ${staticNewsData.length}`)
  console.log(`Admin user: admin / admin123`)
  console.log('\nMigration completed successfully!')
  process.exit(0)
}

migrateFromTypeScript().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
