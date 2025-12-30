"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/data/products"
import { X, Check, Factory } from "lucide-react"

interface ProductDetailModalProps {
  product: Product | null
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
          className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
              <p className="text-gray-600 mt-2 text-lg">{product.description}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square rounded-2xl overflow-hidden relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${product.icon} text-8xl text-white`}></span>
                  </div>
                </div>

                {/* Gallery */}
                {product.gallery && product.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {product.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.title} ${index + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Description */}
                {product.detailedDescription && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Overview</h3>
                    <p className="text-gray-700 leading-relaxed">{product.detailedDescription}</p>
                  </div>
                )}

                {/* Technical Specifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Specifications</h3>
                  {product.technicalSpecs ? (
                    <div className="space-y-3">
                      {Object.entries(product.technicalSpecs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600">{key}:</span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {product.specifications.map((spec, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-3" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Applications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Applications</h3>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Available Brands</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.brands.map((brand, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Factory className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-800">{brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
