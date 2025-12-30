import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '@/db/schema'
import path from 'path'

// Ensure database directory exists
const dbDir = path.join(process.cwd(), 'database')
const dbPath = process.env.DATABASE_PATH || path.join(dbDir, 'xiamen-union.db')

// Create database connection
const sqlite = new Database(dbPath)

// Enable foreign keys
sqlite.pragma('foreign_keys = ON')

// Create drizzle instance
export const db = drizzle(sqlite, { schema })
