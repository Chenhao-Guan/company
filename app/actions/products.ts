"use server"

import { db } from '@/lib/db'
import { products } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { transformDbProduct, getFormDataArray, getDbResult } from '@/lib/utils'

// Get all products (public)
export async function getPublicProducts(filter?: { category?: string }) {
  const query = db
    .select()
    .from(products)
    .where(eq(products.published, true))

  const result = await query.orderBy(desc(products.createdAt))

  let filtered = result
  if (filter?.category && filter.category !== 'all') {
    filtered = result.filter(p => p.category === filter.category)
  }

  return filtered.map(transformDbProduct)
}

// Get product by ID (public)
export async function getPublicProductById(id: number) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1)

  const product = getDbResult(result)
  if (!product || !product.published) return null

  return transformDbProduct(product)
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

  const product = getDbResult(result)
  if (!product) return null

  return transformDbProduct(product)
}

// Create product
export async function createProduct(formData: FormData) {
  try {
    const specifications = getFormDataArray(formData, 'specifications[]')
    const applications = getFormDataArray(formData, 'applications[]')
    const brands = getFormDataArray(formData, 'brands[]')
    const gallery = getFormDataArray(formData, 'gallery[]')

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
    const specifications = getFormDataArray(formData, 'specifications[]')
    const applications = getFormDataArray(formData, 'applications[]')
    const brands = getFormDataArray(formData, 'brands[]')
    const gallery = getFormDataArray(formData, 'gallery[]')

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
