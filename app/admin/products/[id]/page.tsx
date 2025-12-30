"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getProductById, updateProduct, deleteProduct } from '@/app/actions/products'
import { productCategories } from '@/data/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getProductById(Number(params.id)).then(setProduct)
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await updateProduct(Number(params.id), formData)

    if (result.success) {
      router.push('/admin/products')
    } else {
      alert(result.error || 'Failed to update product')
    }

    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return

    const result = await deleteProduct(Number(params.id))
    if (result.success) {
      router.push('/admin/products')
    } else {
      alert(result.error || 'Failed to delete product')
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Product: {product.title}</h1>
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
          <Input name="title" defaultValue={product.title} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select name="category" className="w-full border rounded-lg px-3 py-2" required defaultValue={product.category}>
            {productCategories.filter(c => c.id !== 'all').map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <Textarea name="description" rows={3} defaultValue={product.description} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL *</label>
          <Input name="image" type="url" required defaultValue={product.image} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Specifications (one per line)</label>
          <Textarea
            name="specifications[]"
            rows={4}
            defaultValue={product.specifications?.join('\n')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Applications (one per line)</label>
          <Textarea
            name="applications[]"
            rows={4}
            defaultValue={product.applications?.join('\n')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Brands (comma separated)</label>
          <Input name="brands[]" defaultValue={product.brands?.join(', ')} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Detailed Description</label>
          <Textarea name="detailedDescription" rows={6} defaultValue={product.detailedDescription || ''} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Published</label>
          <select name="published" className="w-full border rounded-lg px-3 py-2" defaultValue={product.published ? 'true' : 'false'}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
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
