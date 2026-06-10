"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { memo } from "react"
import { useRouter } from "next/navigation"
import { productCategories as productCategoriesData } from "@/data/products"

function Footer() {
  const router = useRouter()

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Products", href: "/products" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/#contact" },
  ]

  const productCategories = productCategoriesData.filter(cat => cat.id !== "all")

  const navigateTo = (href: string) => {
    if (href.startsWith("/#")) {
      router.push("/")
      setTimeout(() => {
        const element = document.querySelector(href.substring(1))
        if (element) element.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) element.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(href)
    }
  }

  return (
    <footer className="bg-[hsl(var(--foreground))] text-white">
      {/* Top technical line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info - 4 cols */}
          <div className="lg:col-span-4">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-lg font-bold tracking-wider">RENHE</span>
              <span className="text-xs tracking-widest text-gray-500">PRECISION SPARE PARTS</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Professional industrial equipment spare parts supplier.
              Precision-engineered components for marine and locomotive diesel engines,
              manufactured to micron tolerances.
            </p>
            <div className="flex gap-4">
              <div className="px-3 py-1.5 border border-gray-700 text-xs spec-label tracking-wider text-gray-500">
                ISO 9001
              </div>
              <div className="px-3 py-1.5 border border-gray-700 text-xs spec-label tracking-wider text-gray-500">
                SINCE 2008
              </div>
            </div>
          </div>

          {/* Quick Links - 2 cols */}
          <div className="lg:col-span-2">
            <div className="spec-label text-gray-500 mb-4 tracking-wider">NAVIGATION</div>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigateTo(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories - 3 cols */}
          <div className="lg:col-span-3">
            <div className="spec-label text-gray-500 mb-4 tracking-wider">PRODUCT CATEGORIES</div>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => navigateTo(`/products?category=${category.id}`)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - 3 cols */}
          <div className="lg:col-span-3">
            <div className="spec-label text-gray-500 mb-4 tracking-wider">CONTACT</div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Software Park Phase II, Siming District<br />
                  Xiamen, Fujian, China
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <p className="text-sm text-gray-400">+86 592-1234567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <p className="text-sm text-gray-400">info@xiamenunion.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <p className="text-sm text-gray-400">Mon–Fri 08:00–18:00 CST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">© 2026 Xiamen Union Spares Ltd. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-600">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Site Map</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
