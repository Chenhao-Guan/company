import MediaLibrary from '@/components/admin/media-library'

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">媒体库</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            在这里管理所有上传的图片。点击图片可以查看大图或删除。
          </p>
        </div>

        <MediaLibrary folder="upload" />
      </div>
    </div>
  )
}
