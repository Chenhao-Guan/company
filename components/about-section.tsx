"use client"

import { memo, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

function ImageCarousel({ images }: { images: { src: string; alt: string; title: string; description: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({ 0: true })

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
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

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
    <div className="relative overflow-hidden border border-[hsl(var(--border))]">
      <div className="relative aspect-[4/3] bg-[hsl(var(--muted))]">
        {imageLoadingStates[currentIndex] && (
          <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--muted))] z-10">
            <div className="animate-pulse text-[hsl(var(--muted-foreground))] spec-label">LOADING...</div>
          </div>
        )}
        <img
          key={currentIndex}
          src={currentImage.src}
          alt={currentImage.alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages.has(currentIndex) ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
        />
        {loadedImages.has(currentIndex) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        )}
        {loadedImages.has(currentIndex) && (
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-lg font-bold mb-1">{currentImage.title}</h3>
            <p className="text-sm text-gray-300">{currentImage.description}</p>
          </div>
        )}
      </div>

      <button onClick={goToPrevious} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-[hsl(var(--border))] flex items-center justify-center hover:bg-white transition-colors z-20" aria-label="Previous">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={goToNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-[hsl(var(--border))] flex items-center justify-center hover:bg-white transition-colors z-20" aria-label="Next">
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="absolute bottom-4 right-6 flex gap-1.5 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-6 h-1 transition-all ${index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function AboutSection() {
  const aboutImages = [
    { src: "/image/about/about-1.jpg", alt: "Modern Warehouse Facility", title: "Modern Warehouse Facility", description: "Intelligent management, rapid response" },
    { src: "/image/about/about-2.jpg", alt: "Quality Control Center", title: "Quality Control Center", description: "Strict quality inspection" },
    { src: "/image/about/about-3.jpg", alt: "Advanced Equipment", title: "Advanced Equipment", description: "State-of-the-art precision manufacturing" },
  ]

  const capabilities = [
    { label: "YEARS IN OPERATION", value: "15+" },
    { label: "PRODUCT MODELS", value: "10,000+" },
    { label: "GLOBAL PARTNERS", value: "500+" },
    { label: "SATISFACTION RATE", value: "99.7%" },
  ]

  return (
    <section id="about" className="py-24 bg-white relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[hsl(var(--primary))]" />
          <span className="spec-label text-[hsl(var(--primary))]">ABOUT US</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] mb-16 tracking-tight">
          Manufacturing excellence,<br />since 2008.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
              Xiamen Union Spares Ltd. was established in 2008 and is a modern enterprise
              specializing in the supply of industrial equipment spare parts. We are committed
              to providing high-quality industrial spare parts and professional technical support
              services to global customers.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-10">
              The company has a complete supply chain system and professional technical team,
              and has established long-term cooperative relationships with many well-known brands,
              ensuring that we provide customers with original genuine products and timely technical support.
            </p>

            {/* Capability specs */}
            <div className="grid grid-cols-2 border border-[hsl(var(--border))]">
              {capabilities.map((cap, index) => (
                <div
                  key={cap.label}
                  className={`px-6 py-5 ${index % 2 === 1 ? 'border-l border-[hsl(var(--border))]' : ''} ${index >= 2 ? 'border-t border-[hsl(var(--border))]' : ''}`}
                >
                  <div className="spec-label mb-1">{cap.label}</div>
                  <div className="spec-value text-2xl">{cap.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Carousel */}
          <div className="relative">
            <ImageCarousel images={aboutImages} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(AboutSection)
