"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import HeroBanner from "@/components/hero-banner"
import ProductOverview from "@/components/product-overview"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"

export default function HomeContent() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <main>
      <motion.div style={{ opacity }}>
        <HeroBanner />
      </motion.div>
      <ProductOverview />
      <AboutSection />
      <ContactSection />
    </main>
  )
}