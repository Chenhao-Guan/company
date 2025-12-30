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
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    // Set image URL
    formData.set('image', imageUrl)
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
          <label className="block text-sm font-medium mb-2">Product Image *</label>
          <div className="flex gap-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="text"
              required
              placeholder="/image/products/..."
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowImagePicker(true)}
            >
              Select Image
            </Button>
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Preview" className="h-40 w-auto object-cover rounded border" />
            </div>
          )}
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

      {/* Image Picker Dialog */}
      {showImagePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Select Image</h3>
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

// Image Picker Component
function ImagePickerContent({ onSelect }: { onSelect: (url: string) => void }) {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [folder, setFolder] = useState('products')

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
        alert(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    }

    setUploading(false)
    e.target.value = ''
  }

  // Load on mount and folder change
  useState(() => {
    loadFiles()
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="products">Products</option>
          <option value="news">News</option>
          <option value="upload">Other</option>
        </select>

        <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Upload New Image
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No images found, please upload
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
                  <span className="text-white text-sm">Click to Select</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
