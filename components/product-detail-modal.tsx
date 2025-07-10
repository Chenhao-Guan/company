"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailModalProps {
  product: any
  onClose: () => void
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
              <p className="text-gray-600 mt-1">{product.description}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <i className="fas fa-times text-xl text-gray-500"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`${product.icon} text-8xl text-white`}></i>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Price */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                  <div className="text-2xl font-bold text-blue-600">{product.price}</div>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Specifications</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <i className="fas fa-check text-green-500 mr-3"></i>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Applications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Brands</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.brands.map((brand, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <i className="fas fa-industry text-gray-400 mr-3"></i>
                        <span className="font-medium text-gray-800">{brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const element = document.querySelector("#contact")
                  if (element) {
                    onClose()
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <i className="fas fa-envelope mr-2"></i>
                Request Quote
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
