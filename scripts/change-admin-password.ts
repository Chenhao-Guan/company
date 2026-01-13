import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import * as schema from '@/db/schema'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import path from 'path'
import readline from 'readline'

const dbDir = path.join(process.cwd(), 'database')
const dbPath = path.join(dbDir, 'xiamen-union.db')

const sqlite = new Database(dbPath)
const db = drizzle(sqlite, { schema })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer)
    })
  })
}

async function main() {
  console.log('\n=== 修改 Admin 密码 ===\n')

  const username = await question('请输入用户名 (默认: admin): ') || 'admin'
  const newPassword = await question('请输入新密码: ')
  const confirmPassword = await question('请确认新密码: ')

  if (newPassword !== confirmPassword) {
    console.error('\n错误: 两次输入的密码不一致')
    process.exit(1)
  }

  if (newPassword.length < 6) {
    console.error('\n错误: 密码长度至少为 6 位')
    process.exit(1)
  }

  // 检查用户是否存在
  const users = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.username, username))

  if (users.length === 0) {
    console.error(`\n错误: 用户 "${username}" 不存在`)
    process.exit(1)
  }

  // 加密新密码
  console.log('\n正在加密密码...')
  const passwordHash = await bcrypt.hash(newPassword, 12)

  // 更新密码
  await db.update(schema.adminUsers)
    .set({ passwordHash })
    .where(eq(schema.adminUsers.username, username))

  console.log(`\n✓ 密码已成功修改！`)
  console.log(`  用户名: ${username}`)
  console.log(`  新密码: ${newPassword}`)
  console.log(`\n请使用新密码登录: https://unionspares.net/admin/login\n`)

  rl.close()
  process.exit(0)
}

main().catch((err) => {
  console.error('\n错误:', err)
  rl.close()
  process.exit(1)
})
