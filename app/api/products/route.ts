import { NextResponse } from 'next/server'
import { getPublicProducts } from '@/app/actions/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || undefined

  const products = await getPublicProducts({ category })

  return NextResponse.json(products)
}
