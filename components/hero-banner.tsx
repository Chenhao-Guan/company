"use client"

import { memo } from "react"
import { ArrowRight } from "lucide-react"

function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Technical grid background */}
      <div className="absolute inset-0 bg-grid-tech opacity-40" />
      <div className="absolute inset-0 bg-grid-fine opacity-30" />

      {/* Precise geometric accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hsl(210 100% 45%) to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hsl(210 100% 45%) to-transparent opacity-20" />
      <div className="absolute top-1/4 right-0 w-px h-1/2 bg-gradient-to-b from-transparent via-hsl(214 20% 88%) to-transparent" />
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-hsl(214 20% 88%) to-transparent opacity-50" />

      {/* Coordinate labels - technical drawing feel */}
      <div className="absolute top-6 left-8 spec-label opacity-40">
        Xiamen Union Spares Ltd.
      </div>
      <div className="absolute top-6 right-8 spec-label opacity-40">
        EST. 2008 — Xiamen, CN
      </div>
      <div className="absolute bottom-6 left-8 spec-label opacity-40">
        24°29′N 118°08′E
      </div>
      <div className="absolute bottom-6 right-8 spec-label opacity-40">
        ISO 9001:2015 CERTIFIED
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen py-32">
          {/* Left - Main Message */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section indicator */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[hsl(var(--primary))]" />
              <span className="spec-label text-[hsl(var(--primary))]">Precision Engineered Spare Parts</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[hsl(var(--foreground))] leading-[1.05] tracking-tight">
              Engineered for<br />
              <span className="text-[hsl(var(--primary))]">extreme conditions.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-xl leading-relaxed">
              Precision spare parts for marine and locomotive diesel engines.
              Cylinder covers, pistons, liners, bearings, crankshafts, and connecting rods —
              manufactured to micron tolerances, delivered worldwide.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-6 pt-2">
              <button
                className="group flex items-center gap-2 px-6 py-3 bg-[hsl(var(--foreground))] text-white text-sm font-semibold tracking-wide hover:bg-[hsl(var(--primary))] transition-colors"
                onClick={() => {
                  const el = document.querySelector("#products")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                VIEW PRODUCTS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-sm font-semibold tracking-wide hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors"
                onClick={() => {
                  const el = document.querySelector("#contact")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                REQUEST QUOTE
              </button>
            </div>
          </div>

          {/* Right - Technical Specs Panel */}
          <div className="lg:col-span-5">
            <div className="border border-[hsl(var(--border))] bg-white/80 backdrop-blur-sm">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
                <span className="spec-label">SPECIFICATIONS</span>
                <span className="spec-label">CATALOG 2026</span>
              </div>

              {/* Spec rows */}
              <div className="divide-y divide-[hsl(var(--border))]">
                {[
                  { label: "CYLINDER COVERS", value: "Ø 150–980mm", tol: "±0.01mm" },
                  { label: "PISTONS", value: "Ø 100–600mm", tol: "±0.005mm" },
                  { label: "CYLINDER LINERS", value: "Ø 100–600mm", tol: "±0.01mm" },
                  { label: "BEARINGS", value: "Ø 50–500mm", tol: "±0.003mm" },
                  { label: "CRANKSHAFTS", value: "L ≤ 6000mm", tol: "±0.02mm" },
                  { label: "CONNECTING RODS", value: "L 200–2000mm", tol: "±0.01mm" },
                ].map((spec) => (
                  <div key={spec.label} className="px-6 py-4 flex items-center justify-between hover:bg-[hsl(var(--muted)/0.5)] transition-colors">
                    <div>
                      <div className="spec-label mb-1">{spec.label}</div>
                      <div className="spec-value text-sm">{spec.value}</div>
                    </div>
                    <div className="text-right">
                      <div className="spec-label mb-1">TOLERANCE</div>
                      <div className="font-mono-tech text-sm font-semibold text-[hsl(var(--tech-green))]">{spec.tol}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Panel footer */}
              <div className="px-6 py-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
                <div className="flex justify-between items-center">
                  <span className="spec-label">COMPATIBLE BRANDS</span>
                  <span className="spec-value text-xs">MAN · Sulzer · Wärtsilä · MaK · EMD · Daihatsu · Pielstick</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroBanner)
