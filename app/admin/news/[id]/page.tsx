"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getNewsById, updateNews, deleteNews } from '@/app/actions/news'
import { newsCategories } from '@/data/news'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import RichTextEditor from '@/components/admin/rich-text-editor'

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [news, setNews] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getNewsById(Number(params.id)).then((data) => {
      setNews(data)
      if (data) {
        setContent(data.content || '')
        setImageUrl(data.image || '')
      }
    })
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // Set content from rich text editor
    formData.set('content', content)
    formData.set('image', imageUrl)

    // Handle tags
    const form = e.currentTarget as HTMLFormElement
    const tags = (form.querySelector('[name="tags"]') as HTMLInputElement)?.value?.split(',').map(t => t.trim()).filter(Boolean) || []

    formData.delete('tags[]')
    tags.forEach(tag => formData.append('tags[]', tag))

    const result = await updateNews(Number(params.id), formData)

    if (result.success) {
      router.push('/admin/news')
    } else {
      alert(result.error || 'Failed to update news')
    }

    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('确定要删除这篇新闻吗？')) return

    const result = await deleteNews(Number(params.id))
    if (result.success) {
      router.push('/admin/news')
    } else {
      alert(result.error || 'Failed to delete news')
    }
  }

  if (!news) return <div>Loading...</div>

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">编辑新闻: {news.title}</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          取消
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">标题 *</label>
          <Input name="title" defaultValue={news.title} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">摘要 *</label>
          <Textarea name="excerpt" rows={3} defaultValue={news.excerpt} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">日期 *</label>
            <Input name="date" type="date" defaultValue={news.date} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">分类 *</label>
            <select name="category" className="w-full border rounded-lg px-3 py-2" required defaultValue={news.category}>
              {newsCategories.filter(c => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">分类名称 *</label>
          <Input name="categoryName" defaultValue={news.categoryName} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">阅读时间 *</label>
            <Input name="readTime" defaultValue={news.readTime} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">作者 *</label>
            <Input name="author" defaultValue={news.author} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">封面图片 *</label>
          <div className="flex gap-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="text"
              required
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowImagePicker(true)}
            >
              选择图片
            </Button>
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="预览" className="h-32 w-auto object-cover rounded" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            内容 * <span className="text-gray-500 font-normal">(Notion 风格编辑器，支持富文本和图片)</span>
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="开始编写新闻内容..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">标签 (逗号分隔)</label>
          <Input name="tags" defaultValue={news.tags?.join(', ') || ''} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">发布状态</label>
          <select name="published" className="w-full border rounded-lg px-3 py-2" defaultValue={news.published ? 'true' : 'false'}>
            <option value="true">已发布</option>
            <option value="false">草稿</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            value="true"
            id="featured"
            defaultChecked={news.featured}
            className="mr-2"
          />
          <label htmlFor="featured" className="text-sm">设为精选文章</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? '更新中...' : '更新新闻'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            取消
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            删除
          </Button>
        </div>
      </form>

      {/* 图片选择对话框 */}
      {showImagePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">选择图片</h3>
              <button
                type="button"
                onClick={() => setShowImagePicker(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <ImagePickerContent onSelect={(url) => {
                setImageUrl(url)
                setShowImagePicker(false)
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 内嵌组件：图片选择器内容
function ImagePickerContent({ onSelect }: { onSelect: (url: string) => void }) {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [folder, setFolder] = useState('news')

  const loadFiles = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/upload?folder=${folder}`)
      const data = await res.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error('Failed to load files:', error)
    }
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.success) {
        await loadFiles()
      } else {
        alert(data.error || '上传失败')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('上传失败')
    }

    setUploading(false)
    e.target.value = ''
  }

  useEffect(() => {
    loadFiles()
  }, [folder])

  return (
    <div className="space-y-4">
      {/* 文件夹选择和上传 */}
      <div className="flex gap-4 items-center">
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="news">新闻图片</option>
          <option value="products">产品图片</option>
          <option value="upload">其他</option>
        </select>

        <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          上传新图片
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {uploading && <span className="text-sm text-gray-500">上传中...</span>}
      </div>

      {/* 图片网格 */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          暂无图片，请上传
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file) => (
            <div
              key={file.url}
              className="relative group border-2 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-all"
              onClick={() => onSelect(file.url)}
            >
              <div className="aspect-square relative bg-gray-100">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm">点击选择</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
