"use client"

import type { NewsItem } from "@/data/news"
import { useState } from "react"
import { Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import BaseModal from "./base-modal"
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "./icons/social"

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
    <>
      <BaseModal
        isOpen={!!news}
        onClose={onClose}
        titleId={`news-title-${news.id}`}
        size="news"
        showCloseButton={false}
      >
        {/* Custom Header with Image Backdrop */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                      <WhatsAppIcon className="w-5 h-5" />
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
      </BaseModal>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm text-white"
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}
