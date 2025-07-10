"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetailModal from "@/components/product-detail-modal"

export default function ProductsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    { id: "all", name: "All Products", icon: "fas fa-th-large" },
    { id: "hydraulic", name: "Hydraulic Systems", icon: "fas fa-tint" },
    { id: "electrical", name: "Electrical Control", icon: "fas fa-bolt" },
    { id: "mechanical", name: "Mechanical Drive", icon: "fas fa-cog" },
    { id: "sealing", name: "Sealing & Lubrication", icon: "fas fa-shield-alt" },
    { id: "instrumentation", name: "Instrumentation", icon: "fas fa-gauge-high" },
    { id: "safety", name: "Safety & Protection", icon: "fas fa-hard-hat" },
  ]

  const products = [
    {
      id: 1,
      title: "Hydraulic Pumps",
      category: "hydraulic",
      description: "High-performance hydraulic pumps for industrial applications",
      icon: "fas fa-tint",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-blue-500 to-blue-600",
      price: "Contact for Quote",
      specifications: ["Pressure: 10-700 bar", "Flow: 5-500 L/min", "Temperature: -40°C to +120°C"],
      applications: ["Construction machinery", "Industrial equipment", "Marine systems"],
      brands: ["Bosch Rexroth", "Parker", "Eaton", "Danfoss"],
    },
    {
      id: 2,
      title: "Hydraulic Valves",
      category: "hydraulic",
      description: "Precision hydraulic control valves and directional valves",
      icon: "fas fa-tint",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-blue-500 to-blue-600",
      price: "Contact for Quote",
      specifications: ["Pressure: 10-350 bar", "Various port sizes", "Manual/Electric operation"],
      applications: ["Mobile hydraulics", "Industrial machinery", "Process control"],
      brands: ["Bosch Rexroth", "Parker", "Hydac", "Sun Hydraulics"],
    },
    {
      id: 3,
      title: "PLC Modules",
      category: "electrical",
      description: "Programmable Logic Controller modules and I/O systems",
      icon: "fas fa-bolt",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-purple-500 to-purple-600",
      price: "Contact for Quote",
      specifications: ["Voltage: 24V DC", "Digital/Analog I/O", "Communication protocols"],
      applications: ["Factory automation", "Process control", "Building management"],
      brands: ["Siemens", "Allen-Bradley", "Schneider", "Omron"],
    },
    {
      id: 4,
      title: "Servo Motors",
      category: "electrical",
      description: "High-precision servo motors and drive systems",
      icon: "fas fa-bolt",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-purple-500 to-purple-600",
      price: "Contact for Quote",
      specifications: ["Power: 0.1-50kW", "Speed: up to 6000 RPM", "High accuracy positioning"],
      applications: ["CNC machines", "Robotics", "Packaging equipment"],
      brands: ["Siemens", "Mitsubishi", "Yaskawa", "Delta"],
    },
    {
      id: 5,
      title: "Industrial Bearings",
      category: "mechanical",
      description: "High-quality ball bearings, roller bearings, and specialty bearings",
      icon: "fas fa-cog",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-green-500 to-green-600",
      price: "Contact for Quote",
      specifications: ["Load capacity: 1kN-500kN", "Speed: up to 50,000 RPM", "Various materials"],
      applications: ["Motors", "Gearboxes", "Conveyor systems"],
      brands: ["SKF", "FAG", "Timken", "NSK"],
    },
    {
      id: 6,
      title: "Gear Reducers",
      category: "mechanical",
      description: "Precision gear reducers and gearboxes for power transmission",
      icon: "fas fa-cog",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-green-500 to-green-600",
      price: "Contact for Quote",
      specifications: ["Ratio: 5:1 to 10000:1", "Torque: 10-50000 Nm", "High efficiency"],
      applications: ["Conveyors", "Mixers", "Cranes"],
      brands: ["SEW", "Nord", "Bonfiglioli", "Flender"],
    },
    {
      id: 7,
      title: "O-Ring Seals",
      category: "sealing",
      description: "High-quality O-rings and sealing solutions",
      icon: "fas fa-shield-alt",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-orange-500 to-orange-600",
      price: "Contact for Quote",
      specifications: ["Temperature: -60°C to +200°C", "Various elastomer materials", "Custom sizes"],
      applications: ["Hydraulic systems", "Pneumatic systems", "Rotating equipment"],
      brands: ["Trelleborg", "Parker", "NOK", "Freudenberg"],
    },
    {
      id: 8,
      title: "Industrial Lubricants",
      category: "sealing",
      description: "Premium industrial lubricants and greases",
      icon: "fas fa-shield-alt",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-orange-500 to-orange-600",
      price: "Contact for Quote",
      specifications: ["Various viscosity grades", "High temperature resistance", "Long service life"],
      applications: ["Bearings", "Gears", "Hydraulic systems"],
      brands: ["Shell", "Mobil", "Castrol", "Total"],
    },
    {
      id: 9,
      title: "Pressure Transmitters",
      category: "instrumentation",
      description: "High-accuracy pressure measurement instruments",
      icon: "fas fa-gauge-high",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-red-500 to-red-600",
      price: "Contact for Quote",
      specifications: ["Accuracy: ±0.1%", "Range: 0-1000 bar", "4-20mA output"],
      applications: ["Process monitoring", "Quality control", "Safety systems"],
      brands: ["Endress+Hauser", "Rosemount", "WIKA", "Yokogawa"],
    },
    {
      id: 10,
      title: "Flow Meters",
      category: "instrumentation",
      description: "Precision flow measurement devices for various media",
      icon: "fas fa-gauge-high",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-red-500 to-red-600",
      price: "Contact for Quote",
      specifications: ["Various technologies", "High accuracy", "Digital communication"],
      applications: ["Process control", "Custody transfer", "Environmental monitoring"],
      brands: ["Endress+Hauser", "Krohne", "ABB", "Siemens"],
    },
    {
      id: 11,
      title: "Safety Valves",
      category: "safety",
      description: "Pressure relief and safety valve systems",
      icon: "fas fa-hard-hat",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-cyan-500 to-cyan-600",
      price: "Contact for Quote",
      specifications: ["ASME/API certified", "Various materials", "Custom settings"],
      applications: ["Pressure vessels", "Steam systems", "Chemical processes"],
      brands: ["Emerson", "Leser", "Crosby", "Spirax Sarco"],
    },
    {
      id: 12,
      title: "Explosion-Proof Equipment",
      category: "safety",
      description: "ATEX certified explosion-proof electrical equipment",
      icon: "fas fa-hard-hat",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-cyan-500 to-cyan-600",
      price: "Contact for Quote",
      specifications: ["ATEX certified", "Various protection methods", "Zone 1 & 2 applications"],
      applications: ["Hazardous areas", "Chemical plants", "Oil & gas"],
      brands: ["R.Stahl", "Pepperl+Fuchs", "Eaton", "ABB"],
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Industrial Spare Parts
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Catalog
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive range of high-quality industrial spare parts for all your equipment needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 border-b" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${category.icon} mr-2`}></i>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === "all" ? "All Products" : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`${product.icon} text-5xl text-white`}></i>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                      {product.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {product.brands.slice(0, 2).map((brand, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {brand}
                        </span>
                      ))}
                      {product.brands.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{product.brands.length - 2}
                        </span>
                      )}
                    </div>
                    <motion.div className="text-blue-600 font-semibold text-sm flex items-center" whileHover={{ x: 5 }}>
                      View <i className="fas fa-arrow-right ml-1"></i>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
