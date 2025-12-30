import { db } from '@/lib/db'
import { products, news } from '@/db/schema'
import { count, eq } from 'drizzle-orm'
import Link from 'next/link'

async function getStats() {
  const productCount = await db
    .select({ count: count() })
    .from(products)
    .where(eq(products.published, true))

  const newsCount = await db
    .select({ count: count() })
    .from(news)
    .where(eq(news.published, true))

  return {
    products: productCount[0].count,
    news: newsCount[0].count,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={stats.products}
          icon="fas fa-box"
          href="/admin/products"
          color="blue"
        />
        <StatCard
          title="News Articles"
          value={stats.news}
          icon="fas fa-newspaper"
          href="/admin/news"
          color="green"
        />
        <StatCard
          title="Quick Actions"
          value=""
          icon="fas fa-bolt"
          href="#"
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Welcome to Admin Panel</h2>
        <p className="text-gray-600 mb-4">
          Use the sidebar to navigate and manage your website content.
        </p>
        <div className="flex space-x-4">
          <Link href="/admin/products/new">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Product
            </button>
          </Link>
          <Link href="/admin/news/new">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Add News
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  href,
  color,
}: {
  title: string
  value: number | string
  icon: string
  href: string
  color: 'blue' | 'green' | 'purple'
}) {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-50',
    green: 'text-green-500 bg-green-50',
    purple: 'text-purple-500 bg-purple-50',
  }

  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-3xl font-bold">{value || '-'}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <i className={`${icon} text-xl`}></i>
          </div>
        </div>
      </div>
    </Link>
  )
}
