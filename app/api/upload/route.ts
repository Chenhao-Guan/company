import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// 允许的图片类型
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
// 最大文件大小 5MB
const MAX_SIZE = 5 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'upload'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // 验证文件大小
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // 生成唯一文件名
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${originalName}`

    // 确保目录存在
    const uploadDir = join(process.cwd(), 'public', 'image', folder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // 保存文件
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // 返回公网访问路径
    const url = `/image/${folder}/${filename}`

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size,
      type: file.type
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}

// GET 请求获取已上传的图片列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder') || 'upload'

    const fs = require('fs')
    const path = require('path')
    const uploadDir = path.join(process.cwd(), 'public', 'image', folder)

    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ files: [] })
    }

    const files = fs.readdirSync(uploadDir)
      .filter((file: string) => {
        const ext = file.split('.').pop()?.toLowerCase()
        return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
      })
      .map((file: string) => ({
        url: `/image/${folder}/${file}`,
        name: file,
        size: fs.statSync(path.join(uploadDir, file)).size,
        createdAt: fs.statSync(path.join(uploadDir, file)).mtime.getTime()
      }))
      .sort((a: any, b: any) => b.createdAt - a.createdAt) // 最新的在前

    return NextResponse.json({ files })
  } catch (error) {
    console.error('Get files error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get files' },
      { status: 500 }
    )
  }
}
