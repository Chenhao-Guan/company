"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CertificatesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [
    { id: "all", name: "All Certificates", icon: "fas fa-certificate" },
    { id: "quality", name: "Quality Management", icon: "fas fa-award" },
    { id: "environmental", name: "Environmental", icon: "fas fa-leaf" },
    { id: "safety", name: "Safety & Health", icon: "fas fa-shield-alt" },
    { id: "product", name: "Product Certification", icon: "fas fa-check-circle" },
  ]

  const certificates = [
    {
      id: 1,
      title: "ISO 9001:2015",
      category: "quality",
      description: "Quality Management System Certification",
      issuer: "SGS Certification Services",
      validUntil: "2025-12-31",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Design, manufacture and supply of industrial spare parts",
        certificateNumber: "CN15/30047.01",
        firstIssued: "2018-01-15",
        lastAudit: "2024-01-15",
      },
    },
    {
      id: 2,
      title: "ISO 14001:2015",
      category: "environmental",
      description: "Environmental Management System",
      issuer: "Bureau Veritas Certification",
      validUntil: "2025-08-20",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Environmental management in manufacturing operations",
        certificateNumber: "ENV-2024-001",
        firstIssued: "2019-08-20",
        lastAudit: "2024-08-20",
      },
    },
    {
      id: 3,
      title: "OHSAS 18001:2007",
      category: "safety",
      description: "Occupational Health and Safety Management",
      issuer: "TÜV Rheinland",
      validUntil: "2025-06-15",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Occupational health and safety management system",
        certificateNumber: "OHS-2024-XM001",
        firstIssued: "2020-06-15",
        lastAudit: "2024-06-15",
      },
    },
    {
      id: 4,
      title: "CE Marking",
      category: "product",
      description: "European Conformity Declaration",
      issuer: "Notified Body 1234",
      validUntil: "2026-03-10",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Hydraulic and pneumatic components",
        certificateNumber: "CE-2024-HYD-001",
        firstIssued: "2021-03-10",
        lastAudit: "2024-03-10",
      },
    },
    {
      id: 5,
      title: "ATEX Certification",
      category: "product",
      description: "Explosive Atmospheres Directive Compliance",
      issuer: "DEKRA Certification",
      validUntil: "2025-11-30",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Explosion-proof electrical equipment",
        certificateNumber: "ATEX-2024-EP-001",
        firstIssued: "2022-11-30",
        lastAudit: "2024-11-30",
      },
    },
    {
      id: 6,
      title: "API Q1 Certification",
      category: "quality",
      description: "American Petroleum Institute Quality Management",
      issuer: "API Certification Body",
      validUntil: "2025-09-15",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Oil and gas industry quality management",
        certificateNumber: "API-Q1-2024-001",
        firstIssued: "2023-09-15",
        lastAudit: "2024-09-15",
      },
    },
    {
      id: 7,
      title: "RoHS Compliance",
      category: "environmental",
      description: "Restriction of Hazardous Substances Directive",
      issuer: "Intertek Testing Services",
      validUntil: "2025-07-20",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Electronic components and assemblies",
        certificateNumber: "RoHS-2024-ELE-001",
        firstIssued: "2021-07-20",
        lastAudit: "2024-07-20",
      },
    },
    {
      id: 8,
      title: "UL Listed",
      category: "safety",
      description: "Underwriters Laboratories Safety Certification",
      issuer: "UL LLC",
      validUntil: "2026-01-10",
      status: "Active",
      image: "/placeholder.svg?height=400&width=300",
      details: {
        scope: "Electrical safety for industrial components",
        certificateNumber: "UL-2024-SAF-001",
        firstIssued: "2022-01-10",
        lastAudit: "2024-01-10",
      },
    },
  ]

  const filteredCertificates = certificates.filter((cert) => {
    return selectedCategory === "all" || cert.category === selectedCategory
  })

  const stats = [
    { number: certificates.filter((c) => c.status === "Active").length, label: "Active Certificates" },
    { number: "15+", label: "Years Certified" },
    { number: "100%", label: "Compliance Rate" },
    { number: "4", label: "Certification Bodies" },
  ]

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
              Quality Certifications
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                & Compliance
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Our commitment to excellence is validated by internationally recognized certifications and standards
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 border border-gray-200"
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
      </section>

      {/* Certificates Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === "all"
                ? "All Certificates"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">Showing {filteredCertificates.length} certificates</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCertificate(certificate)}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50 p-8">
                  <div className="aspect-[3/4] bg-white rounded-lg shadow-md flex items-center justify-center border-2 border-gray-200">
                    <div className="text-center p-4">
                      <i className="fas fa-certificate text-4xl text-blue-600 mb-4"></i>
                      <div className="text-sm font-semibold text-gray-800 mb-2">{certificate.title}</div>
                      <div className="text-xs text-gray-600">{certificate.issuer}</div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        certificate.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {certificate.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{certificate.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Issuer:</span>
                      <span className="text-gray-800 font-medium">{certificate.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Valid Until:</span>
                      <span className="text-gray-800 font-medium">{certificate.validUntil}</span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-4 text-blue-600 font-semibold text-sm flex items-center justify-center"
                    whileHover={{ x: 5 }}
                  >
                    View Details <i className="fas fa-arrow-right ml-1"></i>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          />

          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCertificate.title}</h2>
                <p className="text-gray-600 mt-1">{selectedCertificate.description}</p>
              </div>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="fas fa-times text-xl text-gray-500"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Certificate Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Certificate Number:</span>
                        <span className="text-gray-800 font-medium">
                          {selectedCertificate.details.certificateNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Issuing Body:</span>
                        <span className="text-gray-800 font-medium">{selectedCertificate.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">First Issued:</span>
                        <span className="text-gray-800 font-medium">{selectedCertificate.details.firstIssued}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last Audit:</span>
                        <span className="text-gray-800 font-medium">{selectedCertificate.details.lastAudit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Valid Until:</span>
                        <span className="text-gray-800 font-medium">{selectedCertificate.validUntil}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span
                          className={`font-medium ${
                            selectedCertificate.status === "Active" ? "text-green-600" : "text-yellow-600"
                          }`}
                        >
                          {selectedCertificate.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Scope of Certification</h3>
                  <p className="text-gray-600 text-sm">{selectedCertificate.details.scope}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
