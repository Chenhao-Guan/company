import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely parse JSON with a default value fallback
 */
export function safeJsonParse<T>(str: string | null, defaultValue: T): T {
  if (!str) return defaultValue
  try {
    return JSON.parse(str) as T
  } catch {
    return defaultValue
  }
}

/**
 * Transform database product item with parsed JSON fields
 */
export function transformDbProduct(item: any) {
  return {
    ...item,
    specifications: safeJsonParse<string[]>(item.specifications, []),
    applications: safeJsonParse<string[]>(item.applications, []),
    brands: safeJsonParse<string[]>(item.brands, []),
    technicalSpecs: safeJsonParse<Record<string, string> | null>(item.technicalSpecs || null, null),
    gallery: safeJsonParse<string[] | null>(item.gallery || null, null),
  }
}

/**
 * Transform database news item with parsed JSON fields
 */
export function transformDbNews(item: any) {
  return {
    ...item,
    tags: safeJsonParse<string[]>(item.tags || null, []),
    gallery: safeJsonParse<string[] | null>(item.gallery || null, null),
    contentImages: safeJsonParse<any[] | null>(item.contentImages || null, null),
  }
}

/**
 * Extract array from FormData
 */
export function getFormDataArray(formData: FormData, field: string): string[] {
  return formData.getAll(field).filter(Boolean) as string[]
}

/**
 * Get first result from database query or null
 */
export function getDbResult<T>(result: T[]): T | null {
  return result[0] || null
}
