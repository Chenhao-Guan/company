import dynamic from 'next/dynamic'
import Header from "@/components/header"
import Footer from "@/components/footer"

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
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomeContent />
      <Footer />
    </div>
  )
}