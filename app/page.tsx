import dynamic from 'next/dynamic'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton" // Optional: for a nice loading state

// Dynamically import the client component with SSR turned off
const HomeContent = dynamic(() => import('@/components/home-content'), { 
  ssr: false,
  // Optional: Show a loading skeleton while the component loads on the client
  loading: () => (
    <main className="p-4">
      <Skeleton className="h-[60vh] w-full" />
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