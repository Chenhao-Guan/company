"use client"

import { memo } from "react"
import { useRouter } from "next/navigation"
import { Layers, Copy, Disc, Circle, CircleDot, Settings, Link2, ArrowRight } from "lucide-react"

function ProductOverview() {
  const router = useRouter()

  const productCategories = [
    { title: "Cylinder Cover", description: "Durable cylinder covers for marine & locomotive diesel engines", icon: Copy, count: "150+" },
    { title: "Piston", description: "High-performance pistons designed for maximum efficiency", icon: Disc, count: "200+" },
    { title: "Cylinder Liner", description: "Precision-engineered cylinder liners for optimal function", icon: Circle, count: "180+" },
    { title: "Bearing & Bush", description: "Bearings and bushes for smooth, reliable operation", icon: CircleDot, count: "300+" },
    { title: "Crankshaft", description: "Robust crankshafts built to withstand extreme conditions", icon: Settings, count: "90+" },
    { title: "Connecting Rod", description: "Strong and lightweight connecting rods for superior performance", icon: Link2, count: "120+" },
  ]

  return (
    <section id="products" className="py-24 bg-[hsl(var(--background))] relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[hsl(var(--primary))]" />
              <span className="spec-label text-[hsl(var(--primary))]">PRODUCT CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] tracking-tight">
              Product Categories
            </h2>
          </div>
          <button
            onClick={() => router.push("/products")}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-xs font-semibold tracking-wider hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors"
          >
            VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(var(--border))]">
          {productCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white p-8 group cursor-pointer hover:bg-[hsl(var(--muted)/0.5)] transition-colors"
              onClick={() => router.push("/products")}
            >
              {/* Category header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 border border-[hsl(var(--border))] flex items-center justify-center group-hover:border-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary))] transition-colors">
                  <category.icon className="w-5 h-5" />
                </div>
                <span className="spec-label">{category.count} SKUs</span>
              </div>

              {/* Category info */}
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2 tracking-tight">
                {category.title}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                {category.description}
              </p>

              {/* Explore link */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                EXPLORE
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 bg-[hsl(var(--foreground))] text-white text-xs font-semibold tracking-wider"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(ProductOverview)
