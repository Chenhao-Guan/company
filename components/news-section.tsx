"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface NewsSectionProps {
  onNewsSelect: (news: any) => void
}

export default function NewsSection({ onNewsSelect }: NewsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const news = [
    {
      id: 1,
      title: 'Company Awarded "Excellent Supplier" Title',
      excerpt:
        "In the 2024 annual industry selection, our company won unanimous recognition from customers with high-quality products and services...",
      date: "2024-01-15",
      category: "Company News",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-blue-500 to-blue-600",
      content: `
        <p>We are proud to announce that Xiamen Union Spares Ltd. has been awarded the prestigious "Excellent Supplier" title in the 2024 annual industry evaluation.</p>
        <p>This recognition comes as a result of our unwavering commitment to providing high-quality industrial spare parts and exceptional customer service to our global clientele.</p>
        <p>The award was presented at the Industrial Equipment Suppliers Conference held in Shanghai, where industry leaders gathered to recognize outstanding contributions to the sector.</p>
        <p>Our CEO expressed gratitude to all team members and customers who have supported our journey towards excellence.</p>
      `,
    },
    {
      id: 2,
      title: "New German Imported Hydraulic Parts Product Line",
      excerpt:
        "To meet customer demand for high-end hydraulic equipment spare parts, the company has introduced new products from well-known German brands...",
      date: "2024-01-10",
      category: "Product Updates",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-green-500 to-green-600",
      content: `
        <p>We are excited to announce the expansion of our product portfolio with the addition of premium German hydraulic components.</p>
        <p>This new product line includes high-precision hydraulic pumps, valves, and control systems from leading German manufacturers.</p>
        <p>The new products meet the highest European standards and are designed for demanding industrial applications.</p>
        <p>Our technical team has undergone specialized training to provide expert support for these advanced hydraulic systems.</p>
      `,
    },
    {
      id: 3,
      title: "Smart Warehouse System Officially Online",
      excerpt:
        "The company's investment in building an intelligent warehouse management system has been officially put into use, greatly improving inventory management efficiency...",
      date: "2024-01-05",
      category: "Technology Innovation",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-purple-500 to-purple-600",
      content: `
        <p>Our state-of-the-art smart warehouse management system has gone live, revolutionizing our inventory management capabilities.</p>
        <p>The system features automated sorting, real-time inventory tracking, and predictive analytics for optimal stock management.</p>
        <p>This investment demonstrates our commitment to leveraging technology to improve customer service and operational efficiency.</p>
        <p>The new system reduces order processing time by 60% and improves inventory accuracy to 99.8%.</p>
      `,
    },
    {
      id: 4,
      title: "2024 Chinese New Year Holiday Notice",
      excerpt:
        "According to the national statutory holiday arrangements and combined with the actual situation of the company, the 2024 Chinese New Year holiday arrangements are as follows...",
      date: "2024-01-01",
      category: "Announcements",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-red-500 to-red-600",
      content: `
        <p>Dear Valued Customers and Partners,</p>
        <p>We would like to inform you of our Chinese New Year holiday schedule for 2024.</p>
        <p>Our offices will be closed from February 10-17, 2024, in observance of the Chinese New Year holiday.</p>
        <p>Emergency support will be available during this period. We will resume normal operations on February 18, 2024.</p>
        <p>We wish you and your families a prosperous and healthy New Year!</p>
      `,
    },
  ]

  return (
    <section id="news" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">News & Updates</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about our latest developments and industry insights, keeping up with industry trends together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <motion.article
              key={item.title}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => onNewsSelect(item)}
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
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  {item.date}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>

                <motion.div className="flex items-center text-blue-600 font-semibold text-sm" whileHover={{ x: 5 }}>
                  Read More <i className="fas fa-arrow-right ml-2"></i>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View More News
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
