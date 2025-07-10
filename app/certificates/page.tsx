"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductQueryModal from "@/components/product-query-modal"

export default function CertificatesPage() {
  const [isProductQueryOpen, setIsProductQueryOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const certificates = [
    {
      id: 1,
      title: "ISO 9001:2015 Quality Management System",
      description: "International standard for quality management systems",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-14",
      issuedBy: "SGS Certification Services",
      image: "/placeholder.svg?height=600&width=450",
      category: "Quality Management",
      status: "Active",
    },
    {
      id: 2,
      title: "ISO 14001:2015 Environmental Management",
      description: "Environmental management systems standard",
      issueDate: "2023-08-20",
      expiryDate: "2026-08-19",
      issuedBy: "TÜV SÜD",
      image: "/placeholder.svg?height=600&width=450",
      category: "Environmental",
      status: "Active",
    },
    {
      id: 3,
      title: "OHSAS 18001 Occupational Health & Safety",
      description: "Occupational health and safety management systems",
      issueDate: "2023-09-10",
      expiryDate: "2026-09-09",
      issuedBy: "Bureau Veritas",
      image: "/placeholder.svg?height=600&width=450",
      category: "Safety",
      status: "Active",
    },
    {
      id: 4,
      title: "CE Marking Certification",
      description: "European Conformity marking for product safety",
      issueDate: "2023-05-25",
      expiryDate: "2028-05-24",
      issuedBy: "Intertek",
      image: "/placeholder.svg?height=600&width=450",
      category: "Product Safety",
      status: "Active",
    },
    {
      id: 5,
      title: "ATEX Certification",
      description: "Equipment for explosive atmospheres directive",
      issueDate: "2023-07-12",
      expiryDate: "2028-07-11",
      issuedBy: "DEKRA",
      image: "/placeholder.svg?height=600&width=450",
      category: "Explosion Protection",
      status: "Active",
    },
    {
      id: 6,
      title: "AS9100 Aerospace Quality Management",
      description: "Quality management systems for aerospace industry",
      issueDate: "2023-10-05",
      expiryDate: "2026-10-04",
      issuedBy: "DNV GL",
      image: "/placeholder.svg?height=600&width=450",
      category: "Aerospace",
      status: "Active",
    },
    {
      id: 7,
      title: "API Q1 Quality Management System",
      description: "Quality management system for oil and gas industry",
      issueDate: "2023-11-18",
      expiryDate: "2026-11-17",
      issuedBy: "American Petroleum Institute",
      image: "/placeholder.svg?height=600&width=450",
      category: "Oil & Gas",
      status: "Active",
    },
    {
      id: 8,
      title: "UL Listed Components",
      description: "Underwriters Laboratories safety certification",
      issueDate: "2023-04-30",
      expiryDate: "2028-04-29",
      issuedBy: "UL LLC",
      image: "/placeholder.svg?height=600&width=450",
      category: "Electrical Safety",
      status: "Active",
    },
  ]

  const categories = [
    "All Certificates",
    "Quality Management",
    "Environmental",
    "Safety",
    "Product Safety",
    "Explosion Protection",
    "Aerospace",
    "Oil & Gas",
    "Electrical Safety",
  ]

  const [selectedCategory, setSelectedCategory] = useState("All Certificates")

  const filteredCertificates = certificates.filter((cert) => {
    return selectedCategory === "All Certificates" || cert.category === selectedCategory
  })

  const openCertificateModal = (certificate: any) => {
    setSelectedCertificate(certificate)
  }

  const closeCertificateModal = () => {
    setSelectedCertificate(null)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onProductQuery={() => setIsProductQueryOpen(true)} />

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
              Quality
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Our commitment to excellence is validated by internationally recognized certifications and quality
              standards
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">{certificates.length}</div>
              <div className="text-gray-600">Active Certificates</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-600">Years Certified</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Compliance Rate</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Recognized</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 border border-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
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
              {selectedCategory === "All Certificates" ? "All Certifications" : selectedCategory}
            </h2>
            <p className="text-gray-600">{filteredCertificates.length} certificates available</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => openCertificateModal(certificate)}
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
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
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {certificate.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {certificate.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{certificate.description}</p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <i className="fas fa-calendar-alt mr-2 text-blue-500"></i>
                      <span>Issued: {certificate.issueDate}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-certificate mr-2 text-green-500"></i>
                      <span>Valid until: {certificate.expiryDate}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-building mr-2 text-purple-500"></i>
                      <span className="line-clamp-1">{certificate.issuedBy}</span>
                    </div>
                  </div>

                  <motion.div
                    className="mt-4 text-blue-600 font-semibold text-sm flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    View Certificate <i className="fas fa-arrow-right ml-2"></i>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-certificate text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No certificates found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Certificate Modal */}
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
            onClick={closeCertificateModal}
          />

          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCertificate.title}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {selectedCertificate.category}
                  </span>
                </div>
                <button onClick={closeCertificateModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <i className="fas fa-times text-xl text-gray-500"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedCertificate.image || "/placeholder.svg"}
                    alt={selectedCertificate.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>

                {/* Remove the buttons section at the bottom of the certificate modal */}
                {/* The certificate details section should end without the action buttons */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Certificate Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-700">Description</p>
                          <p className="text-gray-600">{selectedCertificate.description}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-calendar-alt text-green-500 mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-700">Issue Date</p>
                          <p className="text-gray-600">{selectedCertificate.issueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-calendar-check text-orange-500 mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-700">Expiry Date</p>
                          <p className="text-gray-600">{selectedCertificate.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-building text-purple-500 mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-700">Issued By</p>
                          <p className="text-gray-600">{selectedCertificate.issuedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <i className="fas fa-check-circle text-green-500 mt-1"></i>
                        <div>
                          <p className="font-medium text-gray-700">Status</p>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              selectedCertificate.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {selectedCertificate.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Product Query Modal */}
      <ProductQueryModal isOpen={isProductQueryOpen} onClose={() => setIsProductQueryOpen(false)} />
    </div>
  )
}
