"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getNewsById, updateNews, deleteNews } from '@/app/actions/news'
import { newsCategories } from '@/data/news'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [news, setNews] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getNewsById(Number(params.id)).then(setNews)
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

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
    if (!confirm('Are you sure you want to delete this news article?')) return

    const result = await deleteNews(Number(params.id))
    if (result.success) {
      router.push('/admin/news')
    } else {
      alert(result.error || 'Failed to delete news')
    }
  }

  if (!news) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit News: {news.title}</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <Input name="title" defaultValue={news.title} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt *</label>
          <Textarea name="excerpt" rows={3} defaultValue={news.excerpt} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date *</label>
            <Input name="date" type="date" defaultValue={news.date} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select name="category" className="w-full border rounded-lg px-3 py-2" required defaultValue={news.category}>
              {newsCategories.filter(c => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category Name *</label>
          <Input name="categoryName" defaultValue={news.categoryName} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Read Time *</label>
            <Input name="readTime" defaultValue={news.readTime} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author *</label>
            <Input name="author" defaultValue={news.author} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL *</label>
          <Input name="image" type="url" defaultValue={news.image} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (HTML) *</label>
          <Textarea name="content" rows={12} defaultValue={news.content} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
          <Input name="tags" defaultValue={news.tags?.join(', ') || ''} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Published</label>
          <select name="published" className="w-full border rounded-lg px-3 py-2" defaultValue={news.published ? 'true' : 'false'}>
            <option value="true">Yes</option>
            <option value="false">No</option>
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
          <label htmlFor="featured" className="text-sm">Featured article</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update News'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </form>
    </div>
  )
}
