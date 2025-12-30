import { NextResponse } from 'next/server'
import { getPublicNewsById } from '@/app/actions/news'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const news = await getPublicNewsById(Number(params.id))
  return NextResponse.json(news)
}
