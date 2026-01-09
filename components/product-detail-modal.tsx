"use client"

import type { Product } from "@/data/products"
import { Check, Factory } from "lucide-react"
import Image from "next/image"
import BaseModal from "./base-modal"

interface ProductDetailModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  if (!product) return null

  return (
    <BaseModal
      isOpen={!!product}
      onClose={onClose}
      titleId={`product-title-${product.id}`}
      size="product"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 pr-16">
        <div>
          <h2 id={`product-title-${product.id}`} className="text-3xl font-bold text-gray-900">
            {product.title}
          </h2>
          <p className="text-gray-600 mt-2 text-lg">{product.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`${product.icon} text-8xl text-white`} />
              </div>
            </div>

            {/* Gallery */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {product.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} - Additional view ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                      sizes="(max-width: 1024px) 33vw, 200px"
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
    </BaseModal>
  )
}
