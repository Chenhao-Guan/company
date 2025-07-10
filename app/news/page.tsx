"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductQueryModal from "@/components/product-query-modal"
import NewsDetailModal from "@/components/news-detail-modal"

export default function NewsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isProductQueryOpen, setIsProductQueryOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    { id: "all", name: "All News", icon: "fas fa-newspaper" },
    { id: "company", name: "Company News", icon: "fas fa-building" },
    { id: "products", name: "Product Updates", icon: "fas fa-box" },
    { id: "technology", name: "Technology", icon: "fas fa-microchip" },
    { id: "industry", name: "Industry News", icon: "fas fa-industry" },
    { id: "announcements", name: "Announcements", icon: "fas fa-bullhorn" },
  ]

  const news = [
    {
      id: 1,
      title: 'Company Awarded "Excellent Supplier" Title',
      excerpt:
        "In the 2024 annual industry selection, our company won unanimous recognition from customers with high-quality products and services...",
      date: "2024-01-15",
      category: "company",
      categoryName: "Company News",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-blue-500 to-blue-600",
      readTime: "3 min read",
      author: "Marketing Team",
      content: `
        <p>We are proud to announce that Xiamen Union Spares Ltd. has been awarded the prestigious "Excellent Supplier" title in the 2024 annual industry evaluation.</p>
        <p>This recognition comes as a result of our unwavering commitment to providing high-quality industrial spare parts and exceptional customer service to our global clientele.</p>
        <p>The award was presented at the Industrial Equipment Suppliers Conference held in Shanghai, where industry leaders gathered to recognize outstanding contributions to the sector.</p>
        <p>Our CEO expressed gratitude to all team members and customers who have supported our journey towards excellence.</p>
        <p>This achievement reinforces our position as a leading supplier in the industrial spare parts market and motivates us to continue delivering exceptional value to our customers.</p>
      `,
    },
    {
      id: 2,
      title: "New German Imported Hydraulic Parts Product Line",
      excerpt:
        "To meet customer demand for high-end hydraulic equipment spare parts, the company has introduced new products from well-known German brands...",
      date: "2024-01-10",
      category: "products",
      categoryName: "Product Updates",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-green-500 to-green-600",
      readTime: "4 min read",
      author: "Product Team",
      content: `
        <p>We are excited to announce the expansion of our product portfolio with the addition of premium German hydraulic components.</p>
        <p>This new product line includes high-precision hydraulic pumps, valves, and control systems from leading German manufacturers such as Bosch Rexroth and Hydac.</p>
        <p>The new products meet the highest European standards and are designed for demanding industrial applications including construction machinery, marine systems, and industrial automation.</p>
        <p>Our technical team has undergone specialized training to provide expert support for these advanced hydraulic systems, ensuring our customers receive the best possible service.</p>
        <p>These additions strengthen our position as a comprehensive supplier of industrial hydraulic solutions.</p>
      `,
    },
    {
      id: 3,
      title: "Smart Warehouse System Officially Online",
      excerpt:
        "The company's investment in building an intelligent warehouse management system has been officially put into use, greatly improving inventory management efficiency...",
      date: "2024-01-05",
      category: "technology",
      categoryName: "Technology Innovation",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-purple-500 to-purple-600",
      readTime: "5 min read",
      author: "IT Department",
      content: `
        <p>Our state-of-the-art smart warehouse management system has gone live, revolutionizing our inventory management capabilities.</p>
        <p>The system features automated sorting, real-time inventory tracking, and predictive analytics for optimal stock management.</p>
        <p>Key features include:</p>
        <ul>
          <li>RFID-based inventory tracking</li>
          <li>Automated picking and packing systems</li>
          <li>Real-time stock level monitoring</li>
          <li>Predictive maintenance scheduling</li>
        </ul>
        <p>This investment demonstrates our commitment to leveraging technology to improve customer service and operational efficiency.</p>
        <p>The new system reduces order processing time by 60% and improves inventory accuracy to 99.8%.</p>
      `,
    },
    {
      id: 4,
      title: "Partnership with Leading European Manufacturers",
      excerpt:
        "We have established strategic partnerships with several leading European manufacturers to expand our product offerings...",
      date: "2024-01-01",
      category: "company",
      categoryName: "Company News",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-red-500 to-red-600",
      readTime: "3 min read",
      author: "Business Development",
      content: `
        <p>We are pleased to announce new strategic partnerships with leading European manufacturers in the industrial automation sector.</p>
        <p>These partnerships will enable us to offer an even broader range of high-quality products to our customers, including advanced servo systems, precision sensors, and industrial communication equipment.</p>
        <p>Our new partners include renowned companies from Germany, Italy, and Switzerland, each bringing decades of expertise in their respective fields.</p>
        <p>These collaborations will enhance our ability to provide comprehensive solutions for complex industrial applications.</p>
      `,
    },
    {
      id: 5,
      title: "Industry 4.0 Solutions Now Available",
      excerpt: "Introducing our new range of Industry 4.0 compatible products and solutions for smart manufacturing...",
      date: "2023-12-28",
      category: "technology",
      categoryName: "Technology Innovation",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-cyan-500 to-cyan-600",
      readTime: "6 min read",
      author: "Technical Team",
      content: `
        <p>We are excited to introduce our comprehensive range of Industry 4.0 compatible products and solutions designed for smart manufacturing environments.</p>
        <p>Our Industry 4.0 portfolio includes:</p>
        <ul>
          <li>IoT-enabled sensors and monitoring devices</li>
          <li>Smart actuators with built-in diagnostics</li>
          <li>Cloud-connected control systems</li>
          <li>Predictive maintenance solutions</li>
        </ul>
        <p>These solutions enable manufacturers to achieve higher efficiency, reduce downtime, and optimize their production processes through data-driven insights.</p>
        <p>Our technical team is available to help customers integrate these advanced technologies into their existing systems.</p>
      `,
    },
    {
      id: 6,
      title: "Global Supply Chain Expansion",
      excerpt:
        "We have expanded our global supply chain network to better serve customers worldwide with faster delivery times...",
      date: "2023-12-20",
      category: "company",
      categoryName: "Company News",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-orange-500 to-orange-600",
      readTime: "4 min read",
      author: "Operations Team",
      content: `
        <p>We have significantly expanded our global supply chain network to provide better service to our international customers.</p>
        <p>New distribution centers have been established in key regions including Southeast Asia, Europe, and North America.</p>
        <p>This expansion enables us to:</p>
        <ul>
          <li>Reduce delivery times by up to 50%</li>
          <li>Provide local technical support</li>
          <li>Maintain larger inventory stocks in key regions</li>
          <li>Offer more competitive pricing through optimized logistics</li>
        </ul>
        <p>Our customers can now expect faster response times and improved service quality regardless of their location.</p>
      `,
    },
    {
      id: 7,
      title: "New Quality Certification Achieved",
      excerpt:
        "We have successfully obtained additional quality certifications to further demonstrate our commitment to excellence...",
      date: "2023-12-15",
      category: "announcements",
      categoryName: "Announcements",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-indigo-500 to-indigo-600",
      readTime: "2 min read",
      author: "Quality Assurance",
      content: `
        <p>We are proud to announce that we have successfully obtained additional quality certifications, further demonstrating our commitment to excellence.</p>
        <p>New certifications include:</p>
        <ul>
          <li>ISO 14001:2015 Environmental Management System</li>
          <li>OHSAS 18001 Occupational Health and Safety</li>
          <li>AS9100 Aerospace Quality Management</li>
        </ul>
        <p>These certifications validate our processes and commitment to quality, environmental responsibility, and workplace safety.</p>
        <p>Our customers can be confident that our products and services meet the highest international standards.</p>
      `,
    },
    {
      id: 8,
      title: "Digital Transformation Initiative Launch",
      excerpt:
        "We are launching a comprehensive digital transformation initiative to enhance customer experience and operational efficiency...",
      date: "2023-12-10",
      category: "technology",
      categoryName: "Technology Innovation",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-pink-500 to-pink-600",
      readTime: "5 min read",
      author: "Digital Team",
      content: `
        <p>We are launching a comprehensive digital transformation initiative aimed at enhancing customer experience and operational efficiency.</p>
        <p>Key components of this initiative include:</p>
        <ul>
          <li>New customer portal with real-time order tracking</li>
          <li>Mobile app for field technicians</li>
          <li>AI-powered product recommendation system</li>
          <li>Automated customer service chatbot</li>
        </ul>
        <p>This digital transformation will enable us to provide more personalized service and faster response times to our customers.</p>
        <p>The rollout will be completed in phases over the next 12 months.</p>
      `,
    },
  ]

  const filteredNews = news.filter((item) => {
    return selectedCategory === "all" || item.category === selectedCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <Header onProductQuery={() => setIsProductQueryOpen(true)} />

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
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </motion.button>
            ))}
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
              {selectedCategory === "all" ? "Latest News" : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">{filteredNews.length} articles available</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedNews(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {item.date}
                    <span className="mx-2">•</span>
                    <i className="fas fa-user mr-2"></i>
                    {item.author}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>

                  <motion.div className="flex items-center text-blue-600 font-semibold" whileHover={{ x: 5 }}>
                    Read More <i className="fas fa-arrow-right ml-2"></i>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-newspaper text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No news found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <ProductQueryModal isOpen={isProductQueryOpen} onClose={() => setIsProductQueryOpen(false)} />
      <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  )
}
