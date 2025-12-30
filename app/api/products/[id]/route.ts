import { NextResponse } from 'next/server'
import { getPublicProductById } from '@/app/actions/products'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await getPublicProductById(Number(params.id))
  return NextResponse.json(product)
}
