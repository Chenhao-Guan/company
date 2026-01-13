"use client"

import { motion, useInView } from "framer-motion"
import { useRef, memo, useEffect, useState } from "react"
import { Calendar, Package, Handshake, Star, Settings, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { prefersReducedMotion } from "@/lib/performance"

// 图片轮播组件
function ImageCarousel({ images }: { images: { src: string; alt: string; title: string; description: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({ 0: true })

  // 预加载所有图片
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image()
      img.src = image.src
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]))
        setImageLoadingStates(prev => ({ ...prev, [index]: false }))
      }
    })
  }, [images])

  // 预加载下一张图片
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length
    if (!loadedImages.has(nextIndex)) {
      const img = new Image()
      const nextImage = images[nextIndex]
      if (nextImage) {
        img.src = nextImage.src
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, nextIndex]))
        }
      }
    }
  }, [currentIndex, images, loadedImages])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000) // 每5秒切换一次

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  // 获取当前图片，确保类型安全
  const currentImage = images[currentIndex] ?? images[0] ?? { src: '', alt: '', title: '', description: '' }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      {/* 图片 */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {imageLoadingStates[currentIndex] && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        )}
        <motion.img
          key={currentIndex}
          src={currentImage.src}
          alt={currentImage.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: loadedImages.has(currentIndex) ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {loadedImages.has(currentIndex) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        )}

        {/* 文字描述 */}
        {loadedImages.has(currentIndex) && (
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-6 left-6 text-white"
          >
            <h3 className="text-2xl font-bold mb-2">{currentImage.title}</h3>
            <p className="text-gray-200">{currentImage.description}</p>
          </motion.div>
        )}
      </div>

      {/* 左右切换按钮 */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    setReduceMotion(prefersReducedMotion())
  }, [])

  // About Us 图片数据
  // 将图片放到 public/image/about/ 目录下
  const aboutImages = [
    {
      src: "/image/about/about-1.jpg",  // 替换为实际图片路径
      alt: "Modern Warehouse Facility",
      title: "Modern Warehouse Facility",
      description: "Intelligent management, rapid response to customer needs"
    },
    {
      src: "/image/about/about-2.jpg",  // 替换为实际图片路径
      alt: "Quality Control Center",
      title: "Quality Control Center",
      description: "Strict quality inspection to ensure product excellence"
    },
    {
      src: "/image/about/about-3.jpg",  // 替换为实际图片路径
      alt: "Advanced Equipment",
      title: "Advanced Equipment",
      description: "State-of-the-art facilities ensuring precision manufacturing"
    }
  ]

  const stats = [
    { number: "15+", label: "Years Experience", icon: Calendar },
    { number: "10000+", label: "Product Models", icon: Package },
    { number: "500+", label: "Partner Clients", icon: Handshake },
    { number: "99%", label: "Customer Satisfaction", icon: Star },
  ]

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Us</h2>
            <p className="text-lg text-gray-600 mb-6">
              Xiamen Union Spares Ltd. was established in 2008 and is a modern enterprise specializing in the supply of
              industrial equipment spare parts. We are committed to providing high-quality industrial spare parts and
              professional technical support services to global customers.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              The company has a complete supply chain system and professional technical team, and has established
              long-term cooperative relationships with many well-known brands, ensuring that we provide customers with
              original genuine products and timely technical support.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ImageCarousel images={aboutImages} />

            {/* Floating Elements - only animate if user doesn't prefer reduced motion */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg z-10"
              animate={!reduceMotion ? { rotate: 360 } : undefined}
              transition={!reduceMotion ? { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : undefined}
            >
              <Settings className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg z-10"
              animate={!reduceMotion ? { y: [0, -10, 0] } : undefined}
              transition={!reduceMotion ? { duration: 3, repeat: Number.POSITIVE_INFINITY } : undefined}
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(AboutSection)
