"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useRouter } from "next/navigation"

export default function ProductOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const router = useRouter()

  const productCategories = [
    {
      title: "Hydraulic Systems",
      description: "High-precision hydraulic pumps, valves, seals and core components",
      icon: "fas fa-tint",
      gradient: "from-blue-500 to-blue-600",
      count: "500+ Products",
    },
    {
      title: "Electrical Control",
      description: "PLC modules, sensors, relays and automation equipment",
      icon: "fas fa-bolt",
      gradient: "from-purple-500 to-purple-600",
      count: "300+ Products",
    },
    {
      title: "Mechanical Drive",
      description: "Bearings, gears, couplings and transmission components",
      icon: "fas fa-cog",
      gradient: "from-green-500 to-green-600",
      count: "400+ Products",
    },
    {
      title: "Sealing & Lubrication",
      description: "O-rings, oil seals, lubricants and sealing products",
      icon: "fas fa-shield-alt",
      gradient: "from-orange-500 to-orange-600",
      count: "200+ Products",
    },
    {
      title: "Instrumentation",
      description: "Pressure gauges, thermometers, flow meters and measuring equipment",
      icon: "fas fa-gauge-high",
      gradient: "from-red-500 to-red-600",
      count: "150+ Products",
    },
    {
      title: "Safety & Protection",
      description: "Safety valves, explosion-proof equipment, protective gear",
      icon: "fas fa-hard-hat",
      gradient: "from-cyan-500 to-cyan-600",
      count: "100+ Products",
    },
  ]

  return (
    <section id="products" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Product Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive professional spare parts covering all areas of industrial equipment
          </p>
          <motion.button
            onClick={() => router.push("/products")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-th-large mr-2"></i>
            View All Products
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => router.push("/products")}
            >
              <div className="relative overflow-hidden h-32">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className={`${category.icon} text-5xl text-white`}></i>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {category.count}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <motion.div
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center"
                  whileHover={{ x: 5 }}
                >
                  Explore Products <i className="fas fa-arrow-right ml-2"></i>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
