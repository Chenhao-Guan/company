import Link from 'next/link'
import { logout } from '@/app/actions/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Xiamen Union Spares
              </Link>
              <span className="ml-4 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" target="_blank" className="text-sm text-gray-600 hover:text-gray-900">
                View Site
              </Link>
              <form action={logout}>
                <button type="submit" className="text-sm text-red-600 hover:text-red-900">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-1">
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Products
            </Link>
            <Link
              href="/admin/news"
              className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              News
            </Link>
            <Link
              href="/admin/media"
              className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Media Library
            </Link>
            <Link
              href="/admin/home"
              className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Home Content
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
