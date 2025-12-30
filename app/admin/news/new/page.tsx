"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createNews } from '@/app/actions/news'
import { newsCategories } from '@/data/news'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function NewNewsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // Handle multi-line fields
    const form = e.currentTarget as HTMLFormElement
    const tags = (form.querySelector('[name="tags"]') as HTMLInputElement)?.value?.split(',').map(t => t.trim()).filter(Boolean) || []

    // Add individual tags
    formData.delete('tags[]')
    tags.forEach(tag => formData.append('tags[]', tag))

    const result = await createNews(formData)

    if (result.success) {
      router.push('/admin/news')
    } else {
      alert(result.error || 'Failed to create news')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">New News Article</h1>
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
          <Input name="title" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt *</label>
          <Textarea name="excerpt" rows={3} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date *</label>
            <Input name="date" type="date" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select name="category" className="w-full border rounded-lg px-3 py-2" required>
              {newsCategories.filter(c => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category Name *</label>
          <Input name="categoryName" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Read Time *</label>
            <Input name="readTime" placeholder="e.g., 5 min read" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author *</label>
            <Input name="author" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL *</label>
          <Input name="image" type="url" required placeholder="/image/news/..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (HTML) *</label>
          <Textarea name="content" rows={12} required placeholder="<p>HTML content here...</p>" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
          <Input name="tags" placeholder="tag1, tag2, tag3" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Published</label>
          <select name="published" className="w-full border rounded-lg px-3 py-2">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="featured" value="true" id="featured" className="mr-2" />
          <label htmlFor="featured" className="text-sm">Featured article</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create News'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
