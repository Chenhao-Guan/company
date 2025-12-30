import dynamic from 'next/dynamic'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { generateOrganizationJsonLd, generateWebPageJsonLd } from "@/lib/structured-data"

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
  const webPageJsonLd = generateWebPageJsonLd(
    '',
    'Xiamen Union Spares Ltd. - Professional Industrial Spare Parts Supplier',
    'Professional industrial equipment spare parts supplier providing cylinder covers, pistons, cylinder liners, bearings, crankshafts, and connecting rods.'
  )

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <Header />
        <HomeContent />
        <Footer />
      </div>
    </>
  )
}