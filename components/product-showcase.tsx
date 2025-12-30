"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Droplet, Zap, Settings, Shield, Gauge, HardHat, ArrowRight, LucideIcon } from "lucide-react"

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  tint: Droplet,
  bolt: Zap,
  cog: Settings,
  "shield-alt": Shield,
  "gauge-high": Gauge,
  "hard-hat": HardHat,
}

interface ProductShowcaseProps {
  onProductSelect: (product: any) => void
}

export default function ProductShowcase({ onProductSelect }: ProductShowcaseProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const products = [
    {
      id: 1,
      title: "Hydraulic System Parts",
      description: "High-precision hydraulic pumps, valves, seals and other core components",
      icon: "tint",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-blue-500 to-blue-600",
      details: {
        specifications: [
          "Pressure range: 10-700 bar",
          "Temperature: -40°C to +120°C",
          "Various seal materials available",
        ],
        applications: ["Construction machinery", "Industrial equipment", "Marine systems"],
        brands: ["Bosch Rexroth", "Parker", "Eaton", "Danfoss"],
      },
    },
    {
      id: 2,
      title: "Electrical Control Parts",
      description: "PLC modules, sensors, relays and other automation equipment",
      icon: "bolt",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-purple-500 to-purple-600",
      details: {
        specifications: ["Voltage: 24V-480V", "IP65/IP67 protection", "CE certified"],
        applications: ["Factory automation", "Process control", "Building management"],
        brands: ["Siemens", "Allen-Bradley", "Schneider", "Omron"],
      },
    },
    {
      id: 3,
      title: "Mechanical Drive Parts",
      description: "Bearings, gears, couplings and other transmission system components",
      icon: "cog",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-green-500 to-green-600",
      details: {
        specifications: ["Load capacity: 1kN-500kN", "Speed: up to 50,000 RPM", "Various materials"],
        applications: ["Motors", "Gearboxes", "Conveyor systems"],
        brands: ["SKF", "FAG", "Timken", "NSK"],
      },
    },
    {
      id: 4,
      title: "Sealing & Lubrication",
      description: "O-rings, oil seals, lubricants and other sealing products",
      icon: "shield-alt",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-orange-500 to-orange-600",
      details: {
        specifications: ["Temperature: -60°C to +200°C", "Various elastomer materials", "Custom sizes available"],
        applications: ["Hydraulic systems", "Pneumatic systems", "Rotating equipment"],
        brands: ["Trelleborg", "Parker", "NOK", "Freudenberg"],
      },
    },
    {
      id: 5,
      title: "Instrumentation",
      description: "Pressure gauges, thermometers, flow meters and other measuring equipment",
      icon: "gauge-high",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-red-500 to-red-600",
      details: {
        specifications: ["Accuracy: ±0.1% to ±2%", "Digital and analog options", "Explosion-proof available"],
        applications: ["Process monitoring", "Quality control", "Safety systems"],
        brands: ["Endress+Hauser", "Rosemount", "WIKA", "Yokogawa"],
      },
    },
    {
      id: 6,
      title: "Safety & Protection",
      description: "Safety valves, explosion-proof equipment, personal protective equipment",
      icon: "hard-hat",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-cyan-500 to-cyan-600",
      details: {
        specifications: ["ATEX certified", "SIL rated", "Various protection levels"],
        applications: ["Hazardous areas", "Emergency systems", "Worker protection"],
        brands: ["Honeywell", "MSA", "Dräger", "3M"],
      },
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Product Center</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive professional spare parts covering all areas of industrial equipment, providing comprehensive
            protection for your equipment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {(() => {
                    const IconComponent = iconMap[product.icon] || Settings
                    return <IconComponent className="w-24 h-24 text-white" />
                  })()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <motion.button
                  onClick={() => onProductSelect(product)}
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center"
                  whileHover={{ x: 5 }}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
