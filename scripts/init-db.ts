import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const dbDir = path.join(process.cwd(), 'database')
const dbPath = path.join(dbDir, 'xiamen-union.db')

// 确保目录存在
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// 创建数据库连接
const sqlite = new Database(dbPath)

// 读取并执行迁移文件
const migrationFile = path.join(process.cwd(), 'db/migrations/0000_shocking_sway.sql')
const migrationSQL = fs.readFileSync(migrationFile, 'utf-8')

console.log('Executing database migration...')

// 分割 SQL 语句并执行
const statements = migrationSQL.split('--> statement-breakpoint')
  .map(s => s.trim())
  .filter(s => s.length > 0)

for (const statement of statements) {
  try {
    sqlite.exec(statement)
    console.log('✓ Executed:', statement.substring(0, 50) + '...')
  } catch (error) {
    console.error('✗ Error:', error)
  }
}

console.log('Migration completed!')
sqlite.close()
