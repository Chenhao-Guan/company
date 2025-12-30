"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { NewsItem } from "@/data/news"
import { useState, useEffect, useRef } from "react"
import { X, Calendar, Clock, User } from "lucide-react"
import Image from "next/image"

// Social media SVG icons
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const MessageIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

interface NewsDetailModalProps {
  news: NewsItem | null
  onClose: () => void
}

export default function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null)
        } else {
          onClose()
        }
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose, selectedImage])

  // Focus trap inside modal
  useEffect(() => {
    if (news && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      if (firstElement) {
        firstElement.focus()
      }
    }
  }, [news])

  if (!news) return null

  const renderContentWithImages = (content: string) => {
    if (!news.contentImages || news.contentImages.length === 0) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }

    // Split content into sections and insert images
    const contentSections = content.split("</p>")
    const result: React.ReactNode[] = []
    let imageIndex = 0

    contentSections.forEach((section, index) => {
      if (section.trim()) {
        result.push(<div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: section + "</p>" }} />)
      }

      // Insert image after every 2-3 paragraphs
      if (news.contentImages && imageIndex < news.contentImages.length && (index + 1) % 3 === 0) {
        const image = news.contentImages[imageIndex]
        if (image) {
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
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.caption || "News image"}
                width={1200}
                height={900}
                className="w-full rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(image.url)}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
              />
              <p className="text-sm text-gray-600 mt-2 italic text-center">{image.caption}</p>
            </div>,
          )
          imageIndex++
        }
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
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`news-title-${news.id}`}
          className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Header */}
          <div className="relative">
            <div className={`h-80 bg-gradient-to-br ${news.gradient} relative overflow-hidden`}>
              <Image
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                width={1600}
                height={640}
                className="w-full h-full object-cover opacity-50"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-16 text-white">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-3 inline-block">
                  {news.categoryName}
                </span>
                <h2 id={`news-title-${news.id}`} className="text-4xl font-bold mb-3 leading-tight">
                  {news.title}
                </h2>
                <div className="flex items-center text-gray-200 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {news.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {news.readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {news.author}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
              aria-label="Close news article modal"
            >
              <X className="w-5 h-5 text-white" aria-hidden="true" />
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
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${news.title} - Photo ${index + 1}`}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
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
                      <FacebookIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                      <TwitterIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                      <LinkedInIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <MessageIcon className="w-5 h-5" />
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
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
