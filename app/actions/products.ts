"use server"

import { z } from 'zod'
import { db } from '@/lib/db'
import { products } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { productSchema } from '@/lib/validation'

// Helper to parse JSON fields
function safeJsonParse<T>(str: string | null, defaultValue: T): T {
  if (!str) return defaultValue
  try {
    return JSON.parse(str) as T
  } catch {
    return defaultValue
  }
}

// Get all products (public)
export async function getPublicProducts(filter?: { category?: string }) {
  const query = db
    .select()
    .from(products)
    .where(eq(products.published, true))

  const result = await query.orderBy(desc(products.createdAt))

  if (filter?.category && filter.category !== 'all') {
    return result.filter(p => p.category === filter.category)
  }

  return result
}

// Get product by ID (public)
export async function getPublicProductById(id: number) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1)

  const product = result[0]
  if (!product || !product.published) return null

  return {
    ...product,
    specifications: safeJsonParse<string[]>(product.specifications, []),
    applications: safeJsonParse<string[]>(product.applications, []),
    brands: safeJsonParse<string[]>(product.brands, []),
    technicalSpecs: safeJsonParse<Record<string, string>>(product.technicalSpecs || null, {}),
    gallery: safeJsonParse<string[]>(product.gallery || null, []),
  }
}

// Get all products (admin)
export async function getAllProducts() {
  return await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
}

// Get product by ID (admin)
export async function getProductById(id: number) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1)

  if (!result[0]) return null

  return {
    ...result[0],
    specifications: safeJsonParse<string[]>(result[0].specifications, []),
    applications: safeJsonParse<string[]>(result[0].applications, []),
    brands: safeJsonParse<string[]>(result[0].brands, []),
    technicalSpecs: safeJsonParse<Record<string, string>>(result[0].technicalSpecs || null, {}),
    gallery: safeJsonParse<string[]>(result[0].gallery || null, []),
  }
}

// Create product
export async function createProduct(formData: FormData) {
  try {
    const specifications = formData.getAll('specifications[]').filter(Boolean) as string[]
    const applications = formData.getAll('applications[]').filter(Boolean) as string[]
    const brands = formData.getAll('brands[]').filter(Boolean) as string[]
    const gallery = formData.getAll('gallery[]').filter(Boolean) as string[]

    const data = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      icon: (formData.get('icon') as string) || '',
      image: formData.get('image') as string,
      gradient: (formData.get('gradient') as string) || 'from-transparent to-transparent',
      detailedDescription: formData.get('detailedDescription') as string || null,
      technicalSpecs: formData.get('technicalSpecs') as string || null,
      specifications,
      applications,
      brands,
      gallery: gallery.length > 0 ? gallery : null,
      published: formData.get('published') === 'true',
    }

    await db.insert(products).values({
      ...data,
      specifications: JSON.stringify(specifications),
      applications: JSON.stringify(applications),
      brands: JSON.stringify(brands),
      gallery: gallery.length > 0 ? JSON.stringify(gallery) : null,
    })

    revalidatePath('/products')
    revalidatePath('/admin/products')

    return { success: true }
  } catch (error) {
    console.error('Create product error:', error)
    return { success: false, error: 'Failed to create product' }
  }
}

// Update product
export async function updateProduct(id: number, formData: FormData) {
  try {
    const specifications = formData.getAll('specifications[]').filter(Boolean) as string[]
    const applications = formData.getAll('applications[]').filter(Boolean) as string[]
    const brands = formData.getAll('brands[]').filter(Boolean) as string[]
    const gallery = formData.getAll('gallery[]').filter(Boolean) as string[]

    const data = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      icon: (formData.get('icon') as string) || '',
      image: formData.get('image') as string,
      gradient: (formData.get('gradient') as string) || 'from-transparent to-transparent',
      detailedDescription: formData.get('detailedDescription') as string || null,
      technicalSpecs: formData.get('technicalSpecs') as string || null,
      specifications,
      applications,
      brands,
      gallery: gallery.length > 0 ? gallery : null,
      published: formData.get('published') === 'true',
    }

    await db
      .update(products)
      .set({
        ...data,
        specifications: JSON.stringify(specifications),
        applications: JSON.stringify(applications),
        brands: JSON.stringify(brands),
        gallery: gallery.length > 0 ? JSON.stringify(gallery) : null,
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .where(eq(products.id, id))

    revalidatePath('/products')
    revalidatePath('/admin/products')

    return { success: true }
  } catch (error) {
    console.error('Update product error:', error)
    return { success: false, error: 'Failed to update product' }
  }
}

// Delete product (soft delete)
export async function deleteProduct(id: number) {
  try {
    await db
      .update(products)
      .set({ published: false, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(products.id, id))

    revalidatePath('/products')
    revalidatePath('/admin/products')

    return { success: true }
  } catch (error) {
    console.error('Delete product error:', error)
    return { success: false, error: 'Failed to delete product' }
  }
}
