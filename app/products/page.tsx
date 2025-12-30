"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ProductGridSkeleton } from "@/components/product-skeleton"
import { productCategories } from "@/data/products"
import { generateCollectionPageJsonLd, generateBreadcrumbJsonLd, generateProductJsonLd } from "@/lib/structured-data"

const ProductDetailModal = dynamic(() => import("@/components/product-detail-modal"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8">Loading...</div>,
})

export default function ProductsPage() {
  const ref = useRef(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  // Fetch products from API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)

        // Add Product structured data for each product
        const productJsonLdScripts = data.map((product: any) => {
          const script = document.createElement('script')
          script.type = 'application/ld+json'
          script.id = `product-jsonld-${product.id}`
          script.text = JSON.stringify(generateProductJsonLd(product))
          document.head.appendChild(script)
          return script
        })

        return () => {
          productJsonLdScripts.forEach((script) => script.remove())
        }
      })
      .catch(err => {
        console.error('Failed to fetch products:', err)
        setLoading(false)
      })
  }, [])

  // Update structured data when category changes
  useEffect(() => {
    if (products.length > 0) {
      const categoryJsonLd = generateCollectionPageJsonLd(
        products,
        selectedCategory
      )
      const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: 'Home', url: 'https://xiamenunion.com' },
        { name: 'Products', url: 'https://xiamenunion.com/products' },
      ])

      // Update or create collection page structured data
      let collectionScript = document.getElementById('collection-jsonld')
      if (!collectionScript) {
        collectionScript = document.createElement('script')
        collectionScript.id = 'collection-jsonld'
        collectionScript.type = 'application/ld+json'
        document.head.appendChild(collectionScript)
      }
      collectionScript.textContent = JSON.stringify(categoryJsonLd)

      // Update or create breadcrumb structured data
      let breadcrumbScript = document.getElementById('breadcrumb-jsonld')
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script')
        breadcrumbScript.id = 'breadcrumb-jsonld'
        breadcrumbScript.type = 'application/ld+json'
        document.head.appendChild(breadcrumbScript)
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd)
    }
  }, [products, selectedCategory])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brands.some((brand: string) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const indexOfLastProduct = currentPage * itemsPerPage
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Scroll to top of products section when page changes
  useEffect(() => {
    if (currentPage > 1) {
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }, [currentPage])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main id="main-content" tabIndex={-1}>
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
              Industrial Spare Parts
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Catalog
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive range of high-quality industrial spare parts for all your equipment needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 border-b" ref={ref} aria-label="Product search and filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search products"
                  role="searchbox"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by product category">
              {productCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Filter by ${category.name}`}
                  aria-pressed={selectedCategory === category.id}
                >
                  <i className={`${category.icon} mr-2`} aria-hidden="true"></i>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === "all"
                ? "All Products"
                : productCategories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </p>
          </motion.div>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : currentProducts.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProduct(product)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${product.title}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedProduct(product)
                  }
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index < 8}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`${product.icon} text-5xl text-white`}></i>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                      {product.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {product.brands.slice(0, 2).map((brand: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {brand}
                        </span>
                      ))}
                      {product.brands.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{product.brands.length - 2}
                        </span>
                      )}
                    </div>
                    <motion.div className="text-blue-600 font-semibold text-sm flex items-center" whileHover={{ x: 5 }}>
                      View <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <motion.button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                  whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first, last, current, and adjacent pages
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <motion.button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </motion.button>
                    )
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 text-gray-400">
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <motion.button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                  whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
      </main>

      <Footer />

      {/* Modals */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
