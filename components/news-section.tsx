"use client"

import { memo } from "react"
import { Calendar, ArrowRight } from "lucide-react"

interface NewsSectionProps {
  onNewsSelect: (news: any) => void
}

function NewsSection({ onNewsSelect }: NewsSectionProps) {
  const news = [
    {
      id: 1,
      title: 'Company Awarded "Excellent Supplier" Title',
      excerpt:
        "In the 2024 annual industry selection, our company won unanimous recognition from customers with high-quality products and services...",
      date: "2024-01-15",
      category: "Company News",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-blue-500 to-blue-600",
      content: `
        <p>We are proud to announce that Xiamen Union Spares Ltd. has been awarded the prestigious "Excellent Supplier" title in the 2024 annual industry evaluation.</p>
        <p>This recognition comes as a result of our unwavering commitment to providing high-quality industrial spare parts and exceptional customer service to our global clientele.</p>
        <p>The award was presented at the Industrial Equipment Suppliers Conference held in Shanghai, where industry leaders gathered to recognize outstanding contributions to the sector.</p>
        <p>Our CEO expressed gratitude to all team members and customers who have supported our journey towards excellence.</p>
      `,
    },
    {
      id: 2,
      title: "New German Imported Hydraulic Parts Product Line",
      excerpt:
        "To meet customer demand for high-end hydraulic equipment spare parts, the company has introduced new products from well-known German brands...",
      date: "2024-01-10",
      category: "Product Updates",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-green-500 to-green-600",
      content: `
        <p>We are excited to announce the expansion of our product portfolio with the addition of premium German hydraulic components.</p>
        <p>This new product line includes high-precision hydraulic pumps, valves, and control systems from leading German manufacturers.</p>
        <p>The new products meet the highest European standards and are designed for demanding industrial applications.</p>
        <p>Our technical team has undergone specialized training to provide expert support for these advanced hydraulic systems.</p>
      `,
    },
    {
      id: 3,
      title: "Smart Warehouse System Officially Online",
      excerpt:
        "The company's investment in building an intelligent warehouse management system has been officially put into use, greatly improving inventory management efficiency...",
      date: "2024-01-05",
      category: "Technology Innovation",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-purple-500 to-purple-600",
      content: `
        <p>Our state-of-the-art smart warehouse management system has gone live, revolutionizing our inventory management capabilities.</p>
        <p>The system features automated sorting, real-time inventory tracking, and predictive analytics for optimal stock management.</p>
        <p>This investment demonstrates our commitment to leveraging technology to improve customer service and operational efficiency.</p>
        <p>The new system reduces order processing time by 60% and improves inventory accuracy to 99.8%.</p>
      `,
    },
    {
      id: 4,
      title: "2024 Chinese New Year Holiday Notice",
      excerpt:
        "According to the national statutory holiday arrangements and combined with the actual situation of the company, the 2024 Chinese New Year holiday arrangements are as follows...",
      date: "2024-01-01",
      category: "Announcements",
      image: "/placeholder.svg?height=200&width=300",
      gradient: "from-red-500 to-red-600",
      content: `
        <p>Dear Valued Customers and Partners,</p>
        <p>We would like to inform you of our Chinese New Year holiday schedule for 2024.</p>
        <p>Our offices will be closed from February 10-17, 2024, in observance of the Chinese New Year holiday.</p>
        <p>Emergency support will be available during this period. We will resume normal operations on February 18, 2024.</p>
        <p>We wish you and your families a prosperous and healthy New Year!</p>
      `,
    },
  ]

  return (
    <section id="news" className="py-24 bg-[hsl(var(--background))] relative">
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[hsl(var(--primary))]" />
              <span className="spec-label text-[hsl(var(--primary))]">NEWS & UPDATES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] mb-4 tracking-tight">
              Latest developments.
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl">
              Stay informed about our latest developments and industry insights, keeping up with industry trends together.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(var(--border))] border border-[hsl(var(--border))]">
          {news.map((item) => (
            <article
              key={item.title}
              className="group bg-white cursor-pointer hover:bg-[hsl(var(--muted)/0.5)] transition-colors"
              onClick={() => onNewsSelect(item)}
            >
              <div className="relative border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="spec-label bg-white border border-[hsl(var(--border))] px-3 py-1 text-[hsl(var(--foreground))]">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 spec-label mb-4">
                  <Calendar className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
                  {item.date}
                </div>

                <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-3 tracking-tight line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors">
                  READ MORE
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-[hsl(var(--foreground))] text-white text-xs font-semibold tracking-wider hover:bg-[hsl(var(--primary))] transition-colors">
            VIEW MORE NEWS
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(NewsSection)
