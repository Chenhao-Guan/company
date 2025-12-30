"use client"

import { useState, useEffect } from 'react'

interface MediaFile {
  url: string
  name: string
  size: number
}

interface MediaLibraryProps {
  onSelect?: (url: string) => void
  folder?: string
  multiple?: boolean
}

export default function MediaLibrary({ onSelect, folder = 'upload', multiple = false }: MediaLibraryProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    loadFiles()
  }, [folder])

  async function loadFiles() {
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

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
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
    // 重置 input
    e.target.value = ''
  }

  async function handleDelete(file: MediaFile) {
    if (!confirm(`确定要删除 ${file.name} 吗？`)) return

    try {
      const res = await fetch('/api/upload/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: file.url, folder }),
      })

      if (res.ok) {
        await loadFiles()
      } else {
        alert('删除失败')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('删除失败')
    }
  }

  function toggleSelect(url: string) {
    if (multiple) {
      setSelected(prev =>
        prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
      )
    } else {
      setSelected([url])
    }
  }

  function handleSelect() {
    if (onSelect && selected.length > 0) {
      onSelect(selected[0]!)
    }
  }

  return (
    <div className="space-y-4">
      {/* 上传区域 */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer block"
        >
          <div className="text-gray-500 mb-2">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium">点击上传图片</p>
            <p className="text-sm text-gray-400 mt-1">支持 JPG, PNG, GIF, WebP (最大 5MB)</p>
          </div>
        </label>
        {uploading && <p className="text-blue-600 mt-2">上传中...</p>}
      </div>

      {/* 图片网格 */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">加载中...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          暂无图片，请上传
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.url}
              className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                selected.includes(file.url) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleSelect(file.url)}
            >
              <div className="aspect-square relative bg-gray-100">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onSelect) onSelect(file.url)
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    选择
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(file)
                    }}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    删除
                  </button>
                </div>
              </div>
              <div className="p-2 text-xs text-gray-600 truncate">{file.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* 选中图片的操作 */}
      {selected.length > 0 && onSelect && (
        <div className="fixed bottom-6 right-6">
          <button
            type="button"
            onClick={handleSelect}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
          >
            确认选择 ({selected.length})
          </button>
        </div>
      )}
    </div>
  )
}
