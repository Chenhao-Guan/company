import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News | Xiamen Union Spares Ltd.",
  description: "Stay updated with the latest news, product updates, industry insights, and company announcements from Xiamen Union Spares Ltd.",
  keywords: "industrial news,product updates,industry insights,company news,spare parts news,diesel engine news",
  openGraph: {
    title: "News | Xiamen Union Spares Ltd.",
    description: "Latest news and updates from Xiamen Union Spares Ltd.",
    url: "https://xiamenunion.com/news",
    siteName: "Xiamen Union Spares Ltd.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xiamen Union Spares Ltd. News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News | Xiamen Union Spares Ltd.",
    description: "Latest news and updates from Xiamen Union Spares Ltd.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://xiamenunion.com/news",
  },
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
