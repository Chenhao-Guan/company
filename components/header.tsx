"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { throttle } from "@/lib/performance"

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleScroll = useCallback(
    throttle(() => {
      setIsScrolled(window.scrollY > 50)
    }, 100),
    []
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Products", href: "/products" },
    { name: "News", href: "/news" },
    { name: "Certificates", href: "/certificates" },
    { name: "Contact", href: "/#contact" },
  ]

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith("/#")) {
      if (pathname !== "/") {
        router.push("/")
        setTimeout(() => {
          const element = document.querySelector(href.substring(1))
          if (element) element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } else {
        const element = document.querySelector(href.substring(1))
        if (element) element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(href)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[hsl(var(--border))]"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            className="flex items-center gap-3"
            onClick={() => router.push("/")}
            aria-label="Xiamen Union Spares - Go to home page"
          >
            <Image
              src="/logo.png"
              alt="Xiamen Union Spares Logo"
              width={32}
              height={32}
              priority
            />
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold tracking-wide text-[hsl(var(--foreground))]">
                RENHE
              </span>
              <span className="text-xs tracking-wider hidden sm:inline text-[hsl(var(--muted-foreground))]">
                PRECISION SPARE PARTS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                  pathname === item.href || (item.href === "/" && pathname === "/")
                    ? "text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
                aria-label={item.name}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[hsl(var(--foreground))]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          className="md:hidden border-t border-[hsl(var(--border))] bg-white"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`block w-full text-left px-4 py-3 text-sm font-semibold tracking-wider uppercase transition-colors ${
                  pathname === item.href || (item.href === "/" && pathname === "/")
                    ? "text-[hsl(var(--primary))] bg-[hsl(var(--muted)/0.5)]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)/0.3)]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default memo(Header)
