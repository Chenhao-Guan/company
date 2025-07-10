"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" },
  ]

  const productCategories = [
    "Hydraulic System Parts",
    "Electrical Control Parts",
    "Mechanical Drive Parts",
    "Sealing & Lubrication",
    "Instrumentation",
    "Safety & Protection",
  ]

  const socialLinks = [
    { icon: "fab fa-weixin", name: "WeChat" },
    { icon: "fab fa-qq", name: "QQ" },
    { icon: "fas fa-envelope", name: "Email" },
    { icon: "fas fa-phone", name: "Phone" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <i className="fas fa-cogs text-white text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold">Xiamen Union Spares</h3>
                <p className="text-sm text-gray-400">Industrial Parts Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Professional industrial equipment spare parts supplier, providing high-quality products and professional
              services to global customers.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Product Categories</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category}>
                  <motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ x: 5 }}>
                    {category}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-blue-500 mt-1"></i>
                <div>
                  <p className="text-gray-400">
                    Software Park Phase II, Siming District
                    <br />
                    Xiamen, Fujian, China
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-blue-500"></i>
                <p className="text-gray-400">+86 592-1234567</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-blue-500"></i>
                <p className="text-gray-400">info@xiamenunion.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-clock text-blue-500"></i>
                <p className="text-gray-400">Monday to Friday 8:00-18:00</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
              <div className="w-20 h-20 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                <i className="fas fa-qrcode text-gray-800 text-2xl"></i>
              </div>
              <p className="text-sm text-gray-400">Scan to Follow Us</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 Xiamen Union Spares Ltd. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Site Map
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
