"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState } from "react"
import Header from "@/components/header"
import HeroBanner from "@/components/hero-banner"
import ProductOverview from "@/components/product-overview"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ProductQueryModal from "@/components/product-query-modal"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const [isProductQueryOpen, setIsProductQueryOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header onProductQuery={() => setIsProductQueryOpen(true)} />
      <main>
        <motion.div style={{ opacity }}>
          <HeroBanner onProductQuery={() => setIsProductQueryOpen(true)} />
        </motion.div>
        <ProductOverview />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Modals */}
      <ProductQueryModal isOpen={isProductQueryOpen} onClose={() => setIsProductQueryOpen(false)} />
    </div>
  )
}
