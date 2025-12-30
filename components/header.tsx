"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image" 
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Products", href: "/products" },
    { name: "News", href: "/news" },
    { name: "Certificates", href: "/certificates" },
    { name: "Contact", href: "/#contact" },
  ]

  const handleNavigation = (href: string) => {
    if (href.startsWith("/#")) {
      // Handle anchor links
      if (pathname !== "/") {
        router.push("/")
        setTimeout(() => {
          const element = document.querySelector(href.substring(1))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      } else {
        const element = document.querySelector(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else {
      // Handle regular page navigation
      router.push(href)
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => router.push("/")}
            role="link"
            tabIndex={0}
            aria-label="Xiamen Union Spares - Go to home page"
            onKeyPress={(e) => {
              if (e.key === 'Enter') router.push("/")
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Xiamen Union Spares Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>
                Xiamen Union Spares
              </h1>
              <p className={`text-sm ${isScrolled ? "text-gray-600" : "text-gray-200"}`}>Industrial Parts Solutions</p>
            </div>
          </motion.div>

          {/* Desktop Navigation - Always Visible */}
          <nav className="flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`text-sm font-medium transition-colors hover:text-blue-600 px-3 py-2 rounded-lg ${
                  pathname === item.href || (item.href === "/" && pathname === "/")
                    ? "bg-blue-600 text-white"
                    : isScrolled
                      ? "text-gray-700"
                      : "text-white"
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                aria-label={item.name}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
