"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Newspaper, Star, Calendar, User, type LucideIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { NewsGridSkeleton } from "@/components/news-skeleton"
import { newsCategories, type NewsItem } from "@/data/news"
import { NEWS_CATEGORY_ICON_MAP } from "@/lib/constants"

const NewsDetailModal = dynamic(() => import("@/components/news-detail-modal"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8">Loading...</div>,
})

export default function NewsPage() {
  const ref = useRef(null)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Fetch news from API
  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch news:', err)
        setLoading(false)
      })
  }, [])

  const filteredNews = news.filter((item) => {
    return selectedCategory === "all" || item.category === selectedCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              News &
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Updates
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Stay informed about our latest developments, industry insights, and company news
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {newsCategories.map((category) => {
              const IconComponent: LucideIcon = NEWS_CATEGORY_ICON_MAP[category.id] || Newspaper
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === "all" ? "Latest News" : newsCategories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">{filteredNews.length} articles available</p>
          </motion.div>

          {loading ? (
            <NewsGridSkeleton count={6} />
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedNews(item)}
                role="button"
                tabIndex={0}
                aria-label={`Read article: ${item.title}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedNews(item)
                  }
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index < 6}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60`}></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                      {item.categoryName}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded">{item.readTime}</span>
                  </div>
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-current" />Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                    <span className="mx-2">•</span>
                    <User className="w-4 h-4 mr-2" />
                    {item.author}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <motion.div className="flex items-center text-blue-600 font-semibold" whileHover={{ x: 5 }}>
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </div>
              </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No news found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  )
}
