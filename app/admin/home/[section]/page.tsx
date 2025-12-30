"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getHomeContentBySection, updateHomeContent } from '@/app/actions/home-content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditHomeSectionPage({ params }: { params: { section: string } }) {
  const router = useRouter()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getHomeContentBySection(params.section).then(setContent)
  }, [params.section])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await updateHomeContent(params.section, formData)

    if (result.success) {
      router.push('/admin/home')
    } else {
      alert(result.error || 'Failed to update content')
    }

    setLoading(false)
  }

  if (!content) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit: {content.section}</h1>
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
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input name="title" defaultValue={content.title || ''} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <Input name="subtitle" defaultValue={content.subtitle || ''} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea name="description" rows={6} defaultValue={content.description || ''} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <Input name="image" defaultValue={content.image || ''} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Icon (Font Awesome class)</label>
          <Input name="icon" defaultValue={content.icon || ''} placeholder="fas fa-home" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (JSON)</label>
          <Textarea
            name="content"
            rows={6}
            defaultValue={typeof content.content === 'string' ? content.content : JSON.stringify(content.content || {}, null, 2)}
            placeholder='{"key": "value"}'
          />
          <p className="text-xs text-gray-500 mt-1">For structured data (e.g., hero stats)</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Active</label>
          <select name="isActive" className="w-full border rounded-lg px-3 py-2" defaultValue={content.isActive ? 'true' : 'false'}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Content'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
