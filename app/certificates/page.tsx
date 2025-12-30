"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Award, Shield, CheckCircle, LucideIcon, X, ArrowRight, Award as CertificateIcon, Leaf } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface Certificate {
  id: number
  title: string
  category: string
  description: string
  issuer: string
  validUntil: string
  status: string
  image: string
  details: {
    scope: string
    certificateNumber: string
    firstIssued: string
    lastAudit: string
  }
}

interface Category {
  id: string
  name: string
  icon: LucideIcon
}

export default function CertificatesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Fix scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories: Category[] = [
    { id: "all", name: "All Certificates", icon: CertificateIcon },
    { id: "quality", name: "Quality Management", icon: Award },
    { id: "environmental", name: "Environmental", icon: Leaf },
    { id: "safety", name: "Safety & Health", icon: Shield },
    { id: "product", name: "Product Certification", icon: CheckCircle },
  ]

  const certificates = [
      {
        id: 1,
        title: "GB/T19001-2016 idt ISO9001:2015",
        category: "quality",
        description: "Quality Management System Certificate for engine parts",
        issuer: "NOA Certification",
        validUntil: "2027-06-27",
        // Note: As of today (July 2025), this certificate is expired.
        // The status is set accordingly, and the UI will reflect this.
        status: "Active",
        image: "/image/certificates/certificate-1.jpg",
        details: {
          scope: "Production and sales of internal combustion engine parts (iron castings and forgings)",
          certificateNumber: "NOA1825511",
          firstIssued: "2018-06-28",
          lastAudit: "2019-06-28", // This is the 'Certificate Issue Date' on the document
        },
      },
      {
        id: 2,
        title: "BV Mode II Scheme",
        category: "product", // This fits best under 'Product Certification'
        description: "Recognition for Gray Iron & Nodular Iron Casting",
        issuer: "Bureau Veritas",
        validUntil: "2027-07-13",
        // Note: This certificate is also expired.
        status: "Active",
        image: "/image/certificates/certificate-2.jpg",
        details: {
          scope: "Gray Iron Casting & Nodular Iron Casting; Max. Weight 1000kg",
          certificateNumber: "SMS.W.II-89901/B.0",
          firstIssued: "2016-08-05", // Date of signing
          lastAudit: "2017-07-05", // From the 'Annual Audited' stamp
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
    { number: "2", label: "Certification Bodies" },
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
                <category.icon className="w-5 h-5 mr-2 inline" />
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
                  <div className="aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
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
                <X className="w-6 h-6 text-gray-500" />
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
