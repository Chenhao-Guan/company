"use client"

import { motion, AnimatePresence } from "framer-motion"

interface NewsDetailModalProps {
  news: any
  onClose: () => void
}

export default function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  if (!news) return null

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
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Header */}
          <div className="relative">
            <div className={`h-64 bg-gradient-to-br ${news.gradient} relative overflow-hidden`}>
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-3 inline-block">
                  {news.category}
                </span>
                <h2 className="text-3xl font-bold mb-2">{news.title}</h2>
                <div className="flex items-center text-gray-200">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  {news.date}
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
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
