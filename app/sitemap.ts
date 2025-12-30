import type { MetadataRoute } from 'next'
import { news } from '@/data/news'

const baseUrl = 'https://xiamenunion.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certificates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Product category filter pages
  const productCategories = [
    'cylinder-cover',
    'piston',
    'cylinder-liner',
    'bearing',
    'crankshaft',
    'connecting-rod',
  ]

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${baseUrl}/products?category=${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // News item pages (query-based)
  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}/news?id=${item.id}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...newsPages]
}
