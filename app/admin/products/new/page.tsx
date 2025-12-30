"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/app/actions/products'
import { productCategories } from '@/data/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createProduct(formData)

    if (result.success) {
      router.push('/admin/products')
    } else {
      alert(result.error || 'Failed to create product')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">New Product</h1>
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
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select name="category" className="w-full border rounded-lg px-3 py-2" required>
            {productCategories.filter(c => c.id !== 'all').map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <Textarea name="description" rows={3} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL *</label>
          <Input name="image" type="url" required placeholder="/image/products/..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Specifications (one per line)</label>
          <Textarea
            name="specifications[]"
            rows={4}
            placeholder="Enter each specification on a new line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Applications (one per line)</label>
          <Textarea
            name="applications[]"
            rows={4}
            placeholder="Enter each application on a new line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Brands (comma separated)</label>
          <Input name="brands[]" placeholder="Brand 1, Brand 2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Detailed Description</label>
          <Textarea name="detailedDescription" rows={6} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Published</label>
          <select name="published" className="w-full border rounded-lg px-3 py-2">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
