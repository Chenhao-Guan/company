import { NextResponse } from 'next/server'
import { getPublicProducts } from '@/app/actions/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || undefined

  const products = await getPublicProducts({ category })

  // Parse JSON fields
  const parsedProducts = products.map(p => ({
    ...p,
    specifications: JSON.parse(p.specifications),
    applications: JSON.parse(p.applications),
    brands: JSON.parse(p.brands),
    technicalSpecs: p.technicalSpecs ? JSON.parse(p.technicalSpecs) : undefined,
    gallery: p.gallery ? JSON.parse(p.gallery) : undefined,
  }))

  return NextResponse.json(parsedProducts)
}
