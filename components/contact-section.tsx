"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { memo } from "react"

function ContactSection() {
  const contactItems = [
    {
      icon: MapPin,
      label: "ADDRESS",
      lines: ["Xiamen Union Spares Ltd.", "Software Park Phase II, Siming District", "Xiamen, Fujian, China"],
    },
    {
      icon: Phone,
      label: "PHONE",
      lines: ["+86 592 1234 5678", "+86 592 8765 4321"],
    },
    {
      icon: Mail,
      label: "EMAIL",
      lines: ["info@xiamenunion.com", "sales@xiamenunion.com"],
    },
    {
      icon: Clock,
      label: "BUSINESS HOURS",
      lines: ["Mon–Fri: 08:00–18:00 CST", "Sat: 09:00–17:00 CST", "Sun: Closed"],
    },
  ]

  return (
    <section id="contact" className="py-24 bg-white relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[hsl(var(--primary))]" />
          <span className="spec-label text-[hsl(var(--primary))]">CONTACT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))] mb-4 tracking-tight">
          Get in touch.
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] max-w-xl mb-16">
          Our technical team is ready to help you find the right spare parts.
          Contact us for expert advice and competitive pricing.
        </p>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[hsl(var(--border))]">
          {contactItems.map((item, index) => (
            <div
              key={item.label}
              className={`p-8 ${index % 2 === 1 ? 'border-l border-[hsl(var(--border))]' : ''} ${index >= 2 ? 'border-t border-[hsl(var(--border))]' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <item.icon className="w-4 h-4 text-[hsl(var(--primary))]" />
                <span className="spec-label">{item.label}</span>
              </div>
              <div className="space-y-1">
                {item.lines.map((line, i) => (
                  <p key={i} className="text-sm text-[hsl(var(--foreground))]">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex items-center gap-6">
          <a
            href="mailto:info@xiamenunion.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--foreground))] text-white text-xs font-semibold tracking-wider hover:bg-[hsl(var(--primary))] transition-colors"
          >
            SEND INQUIRY
          </a>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            Typical response within 24 hours
          </span>
        </div>
      </div>
    </section>
  )
}

export default memo(ContactSection)
