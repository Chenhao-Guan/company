import { NextResponse } from 'next/server'
import { getPublicNews } from '@/app/actions/news'

export async function GET() {
  const news = await getPublicNews()
  return NextResponse.json(news)
}
