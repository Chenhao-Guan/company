"use server"

import { db } from '@/lib/db'
import { homeContent } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// Helper to parse JSON fields
function safeJsonParse<T>(str: string | null, defaultValue: T): T {
  if (!str) return defaultValue
  try {
    return JSON.parse(str) as T
  } catch {
    return defaultValue
  }
}

// Get all home content sections
export async function getHomeContent() {
  const result = await db
    .select()
    .from(homeContent)
    .where(eq(homeContent.isActive, true))
    .orderBy(homeContent.orderIndex)

  return result.map(item => ({
    ...item,
    content: safeJsonParse(item.content || null, null),
  }))
}

// Get home content by section
export async function getHomeContentBySection(section: string) {
  const result = await db
    .select()
    .from(homeContent)
    .where(eq(homeContent.section, section))
    .limit(1)

  if (!result[0]) return null

  return {
    ...result[0],
    content: safeJsonParse(result[0].content || null, null),
  }
}

// Get all home content (admin)
export async function getAllHomeContent() {
  const result = await db
    .select()
    .from(homeContent)
    .orderBy(homeContent.orderIndex)

  return result.map(item => ({
    ...item,
    content: safeJsonParse(item.content || null, null),
  }))
}

// Update home content
export async function updateHomeContent(section: string, formData: FormData) {
  try {
    const content = formData.get('content') as string || null
    const data = {
      title: formData.get('title') as string || null,
      subtitle: formData.get('subtitle') as string || null,
      description: formData.get('description') as string || null,
      image: formData.get('image') as string || null,
      icon: formData.get('icon') as string || null,
      content,
      isActive: formData.get('isActive') === 'true',
    }

    await db
      .update(homeContent)
      .set({
        ...data,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(homeContent.section, section))

    revalidatePath('/')
    revalidatePath('/admin/home')

    return { success: true }
  } catch (error) {
    console.error('Update home content error:', error)
    return { success: false, error: 'Failed to update home content' }
  }
}
