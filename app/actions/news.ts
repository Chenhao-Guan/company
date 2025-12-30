"use server"

import { db } from '@/lib/db'
import { news } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
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

// Get all news (public)
export async function getPublicNews() {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.date))

  return result.map(item => ({
    ...item,
    tags: safeJsonParse<string[]>(item.tags || null, []),
    gallery: safeJsonParse<string[]>(item.gallery || null, []),
    contentImages: safeJsonParse<any[]>(item.contentImages || null, []),
  }))
}

// Get news by ID (public)
export async function getPublicNewsById(id: number) {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.id, id))
    .limit(1)

  const item = result[0]
  if (!item || !item.published) return null

  return {
    ...item,
    tags: safeJsonParse<string[]>(item.tags || null, []),
    gallery: safeJsonParse<string[]>(item.gallery || null, []),
    contentImages: safeJsonParse<any[]>(item.contentImages || null, []),
  }
}

// Get all news (admin)
export async function getAllNews() {
  const result = await db
    .select()
    .from(news)
    .orderBy(desc(news.date))

  return result.map(item => ({
    ...item,
    tags: safeJsonParse<string[]>(item.tags || null, []),
    gallery: safeJsonParse<string[]>(item.gallery || null, []),
    contentImages: safeJsonParse<any[]>(item.contentImages || null, []),
  }))
}

// Get news by ID (admin)
export async function getNewsById(id: number) {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.id, id))
    .limit(1)

  if (!result[0]) return null

  return {
    ...result[0],
    tags: safeJsonParse<string[]>(result[0].tags || null, []),
    gallery: safeJsonParse<string[]>(result[0].gallery || null, []),
    contentImages: safeJsonParse<any[]>(result[0].contentImages || null, []),
  }
}

// Create news
export async function createNews(formData: FormData) {
  try {
    const tags = formData.getAll('tags[]').filter(Boolean) as string[]
    const gallery = formData.getAll('gallery[]').filter(Boolean) as string[]
    const contentImages = formData.get('contentImages') as string || null

    const data = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      date: formData.get('date') as string,
      category: formData.get('category') as string,
      categoryName: formData.get('categoryName') as string,
      image: formData.get('image') as string,
      gradient: (formData.get('gradient') as string) || 'from-transparent to-transparent',
      readTime: formData.get('readTime') as string,
      author: formData.get('author') as string,
      content: formData.get('content') as string,
      tags: tags.length > 0 ? tags : null,
      featured: formData.get('featured') === 'true',
      gallery: gallery.length > 0 ? gallery : null,
      contentImages,
      published: formData.get('published') === 'true',
    }

    await db.insert(news).values({
      ...data,
      tags: tags.length > 0 ? JSON.stringify(tags) : null,
      gallery: gallery.length > 0 ? JSON.stringify(gallery) : null,
    })

    revalidatePath('/news')
    revalidatePath('/admin/news')

    return { success: true }
  } catch (error) {
    console.error('Create news error:', error)
    return { success: false, error: 'Failed to create news' }
  }
}

// Update news
export async function updateNews(id: number, formData: FormData) {
  try {
    const tags = formData.getAll('tags[]').filter(Boolean) as string[]
    const gallery = formData.getAll('gallery[]').filter(Boolean) as string[]
    const contentImages = formData.get('contentImages') as string || null

    const data = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      date: formData.get('date') as string,
      category: formData.get('category') as string,
      categoryName: formData.get('categoryName') as string,
      image: formData.get('image') as string,
      gradient: (formData.get('gradient') as string) || 'from-transparent to-transparent',
      readTime: formData.get('readTime') as string,
      author: formData.get('author') as string,
      content: formData.get('content') as string,
      tags: tags.length > 0 ? tags : null,
      featured: formData.get('featured') === 'true',
      gallery: gallery.length > 0 ? gallery : null,
      contentImages,
      published: formData.get('published') === 'true',
    }

    await db
      .update(news)
      .set({
        ...data,
        tags: tags.length > 0 ? JSON.stringify(tags) : null,
        gallery: gallery.length > 0 ? JSON.stringify(gallery) : null,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(news.id, id))

    revalidatePath('/news')
    revalidatePath('/admin/news')

    return { success: true }
  } catch (error) {
    console.error('Update news error:', error)
    return { success: false, error: 'Failed to update news' }
  }
}

// Delete news (soft delete)
export async function deleteNews(id: number) {
  try {
    await db
      .update(news)
      .set({ published: false, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(news.id, id))

    revalidatePath('/news')
    revalidatePath('/admin/news')

    return { success: true }
  } catch (error) {
    console.error('Delete news error:', error)
    return { success: false, error: 'Failed to delete news' }
  }
}
