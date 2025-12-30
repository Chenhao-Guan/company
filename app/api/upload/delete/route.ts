import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const { url, folder } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'No URL provided' },
        { status: 400 }
      )
    }

    // 从 URL 提取文件名
    const filename = url.split('/').pop()
    if (!filename) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL' },
        { status: 400 }
      )
    }

    const filepath = join(process.cwd(), 'public', 'image', folder || 'upload', filename)

    await unlink(filepath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}
