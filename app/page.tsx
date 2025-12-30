import dynamic from 'next/dynamic'
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  generateOrganizationJsonLd,
  generateWebPageJsonLd,
  generateLocalBusinessJsonLd,
  generateFAQJsonLd,
  generateWebSiteJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/structured-data"

// Dynamically import the client component with SSR turned off
const HomeContent = dynamic(() => import('@/components/home-content'), {
  ssr: false,
  loading: () => (
    <main className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </main>
  )
})

export default function HomePage() {
  const organizationJsonLd = generateOrganizationJsonLd()
  const localBusinessJsonLd = generateLocalBusinessJsonLd()
  const webPageJsonLd = generateWebPageJsonLd(
    '',
    'Xiamen Union Spares Ltd. - Professional Industrial Spare Parts Supplier',
    'Professional industrial equipment spare parts supplier providing cylinder covers, pistons, cylinder liners, bearings, crankshafts, and connecting rods.'
  )
  const faqJsonLd = generateFAQJsonLd()
  const webSiteJsonLd = generateWebSiteJsonLd()
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://xiamenunion.com' },
  ])

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <Header />
        <HomeContent />
        <Footer />
      </div>
    </>
  )
}