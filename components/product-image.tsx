"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/data/products"

interface ProductImageProps {
  product: Product
  priority?: boolean
  sizes?: string
  className?: string
}

export function ProductImage({
  product,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",
  className = "",
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse z-10" />
      )}

      {/* Image */}
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.title}
        width={400}
        height={192}
        className={`w-full h-48 object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      {/* Gradient Overlay - Always visible */}
      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-80"
      }`} />

      {/* Icon - Always visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {product.icon && <i className={`${product.icon} text-5xl text-white`}></i>}
      </div>
    </div>
  )
}
