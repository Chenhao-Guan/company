import { getAllHomeContent } from '@/app/actions/home-content'
import Link from 'next/link'

export default async function AdminHomePage() {
  const contentList = await getAllHomeContent()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Home Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentList.map((item) => (
          <Link key={item.section} href={`/admin/home/${item.section}`}>
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{item.section}</h2>
                {item.isActive ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Active</span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">Inactive</span>
                )}
              </div>
              {item.title && <p className="text-sm text-gray-700 mb-2"><strong>Title:</strong> {item.title}</p>}
              {item.subtitle && <p className="text-sm text-gray-700 mb-2"><strong>Subtitle:</strong> {item.subtitle}</p>}
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
