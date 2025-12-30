import { z } from 'zod'

// Auth validation
export const loginSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
})

// Product validation
export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  category: z.enum(['cylinder-cover', 'piston', 'cylinder-liner', 'bearing', 'crankshaft', 'connecting-rod']),
  description: z.string().min(10, 'Description too short').max(1000),
  icon: z.string().default(''),
  image: z.string().url('Invalid image URL'),
  gradient: z.string().default('from-transparent to-transparent'),
  specifications: z.array(z.string()).min(1, 'At least one specification required'),
  applications: z.array(z.string()).min(1, 'At least one application required'),
  brands: z.array(z.string()).min(1, 'At least one brand required'),
  detailedDescription: z.string().optional(),
  technicalSpecs: z.record(z.string()).optional(),
  gallery: z.array(z.string().url()).optional(),
  published: z.boolean().default(true),
})

// News validation
export const newsSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(10).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  category: z.string().min(1),
  categoryName: z.string().min(1),
  image: z.string().url(),
  content: z.string().min(50),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  gallery: z.array(z.string().url()).optional(),
  published: z.boolean().default(true),
})

// Home content validation
export const homeContentSchema = z.object({
  id: z.number().optional(),
  section: z.enum(['hero', 'about', 'product-overview', 'contact']),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  content: z.any().optional(), // JSON data
  image: z.string().optional(),
  icon: z.string().optional(),
  orderIndex: z.number().default(0),
  isActive: z.boolean().default(true),
})
