"use server"

import { db } from '@/lib/db'
import { news } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { transformDbNews, getFormDataArray, getDbResult } from '@/lib/utils'

// Get all news (public)
export async function getPublicNews() {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.date))

  return result.map(transformDbNews)
}

// Get news by ID (public)
export async function getPublicNewsById(id: number) {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.id, id))
    .limit(1)

  const item = getDbResult(result)
  if (!item || !item.published) return null

  return transformDbNews(item)
}

// Get all news (admin)
export async function getAllNews() {
  const result = await db
    .select()
    .from(news)
    .orderBy(desc(news.date))

  return result.map(transformDbNews)
}

// Get news by ID (admin)
export async function getNewsById(id: number) {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.id, id))
    .limit(1)

  const item = getDbResult(result)
  if (!item) return null

  return transformDbNews(item)
}

// Create news
export async function createNews(formData: FormData) {
  try {
    const tags = getFormDataArray(formData, 'tags[]')
    const gallery = getFormDataArray(formData, 'gallery[]')
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
    const tags = getFormDataArray(formData, 'tags[]')
    const gallery = getFormDataArray(formData, 'gallery[]')
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
