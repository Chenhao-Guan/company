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
          <div className="relative">
            <div className={`h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
              <i className={`${product.icon} text-8xl text-white`}></i>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
            >
              <i className="fas fa-times text-xl text-white"></i>
            </button>
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h2>
            <p className="text-lg text-gray-600 mb-8">{product.description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <ul className="space-y-2">
                  {product.specifications?.map((spec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  )) || <li className="text-gray-500">Specifications not available</li>}
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications</h3>
                <ul className="space-y-2">
                  {product.applications?.map((app: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <i className="fas fa-cog text-blue-500 mt-1"></i>
                      <span className="text-gray-700">{app}</span>
                    </li>
                  )) || <li className="text-gray-500">Applications not available</li>}
                </ul>
              </div>
            </div>

            {/* Brands */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Brands</h3>
              <div className="flex flex-wrap gap-3">
                {product.brands?.map((brand: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg font-medium"
                  >
                    {brand}
                  </span>
                )) || <span className="text-gray-500">Brand information not available</span>}
              </div>
            </div>

            {/* Technical Documentation */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Documentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <i className="fas fa-file-pdf text-3xl text-red-500 mb-2"></i>
                  <p className="text-sm font-medium">Technical Datasheet</p>
                  <button className="text-blue-600 text-sm hover:underline">Download PDF</button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <i className="fas fa-drafting-compass text-3xl text-blue-500 mb-2"></i>
                  <p className="text-sm font-medium">CAD Drawings</p>
                  <button className="text-blue-600 text-sm hover:underline">Download DWG</button>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Specifications</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 rounded-lg">
                    <tbody>
                      {product.specifications.map((spec: string, index: number) => {
                        const [key, value] = spec.split(": ")
                        return (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="border border-gray-200 px-4 py-3 font-medium text-gray-700">{key}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-600">{value || "N/A"}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Price Information */}
            {product.price && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Pricing</h4>
                    <p className="text-gray-600">Get competitive pricing for your requirements</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{product.price}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-search mr-2"></i>
                Request Quote
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
