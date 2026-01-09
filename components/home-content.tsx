"use client"

import dynamic from "next/dynamic"
import { Suspense, memo } from "react"
import HeroBanner from "@/components/hero-banner"

// Lazy load components below the fold
const ProductOverview = dynamic(() => import("@/components/product-overview"), {
  loading: () => (
    <div className="py-20 flex justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
})

const AboutSection = dynamic(() => import("@/components/about-section"), {
  loading: () => (
    <div className="py-20 flex justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
})

const ContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => (
    <div className="py-20 flex justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
})

const VideoSection = dynamic(() => import("@/components/video-section"), {
  loading: () => (
    <div className="py-20 flex justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
})

function HomeContent() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroBanner />
      <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <ProductOverview />
      </Suspense>
      <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <VideoSection />
      </Suspense>
      <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <ContactSection />
      </Suspense>
    </main>
  )
}

export default memo(HomeContent)