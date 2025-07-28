"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { NewsItem } from "@/data/news"
import { useState } from "react"

interface NewsDetailModalProps {
  news: NewsItem | null
  onClose: () => void
}

export default function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!news) return null

  const renderContentWithImages = (content: string) => {
    if (!news.contentImages || news.contentImages.length === 0) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }

    // Split content into sections and insert images
    const contentSections = content.split("</p>")
    const result = []
    let imageIndex = 0

    contentSections.forEach((section, index) => {
      if (section.trim()) {
        result.push(<div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: section + "</p>" }} />)
      }

      // Insert image after every 2-3 paragraphs
      if (imageIndex < news.contentImages!.length && (index + 1) % 3 === 0) {
        const image = news.contentImages![imageIndex]
        result.push(
          <div
            key={`image-${imageIndex}`}
            className={`my-8 ${
              image.position === "full"
                ? "w-full"
                : image.position === "left"
                  ? "float-left mr-6 mb-4 w-1/2"
                  : image.position === "right"
                    ? "float-right ml-6 mb-4 w-1/2"
                    : "mx-auto w-2/3"
            }`}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.caption}
              className="w-full rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(image.url)}
            />
            <p className="text-sm text-gray-600 mt-2 italic text-center">{image.caption}</p>
          </div>,
        )
        imageIndex++
      }
    })

    return <div className="prose max-w-none">{result}</div>
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Header */}
          <div className="relative">
            <div className={`h-80 bg-gradient-to-br ${news.gradient} relative overflow-hidden`}>
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-16 text-white">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-3 inline-block">
                  {news.categoryName}
                </span>
                <h2 className="text-4xl font-bold mb-3 leading-tight">{news.title}</h2>
                <div className="flex items-center text-gray-200 space-x-4">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {news.date}
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock mr-2"></i>
                    {news.readTime}
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-user mr-2"></i>
                    {news.author}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
            >
              <i className="fas fa-times text-xl text-white"></i>
            </button>
          </div>

          <div className="p-8">
            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content with Images */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {renderContentWithImages(news.content)}
            </div>

            {/* Gallery */}
            {news.gallery && news.gallery.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {news.gallery.map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Share this article</h4>
                  <div className="flex space-x-3">
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <i className="fab fa-whatsapp"></i>
                    </button>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Lightbox */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full object-contain rounded-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm text-white"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
