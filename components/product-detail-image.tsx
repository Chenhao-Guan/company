"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductDetailImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  sizes?: string
  className?: string
}

export function ProductDetailImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className = "",
}: ProductDetailImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative">
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse z-10 rounded-lg" />
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
