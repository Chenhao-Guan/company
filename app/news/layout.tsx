import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News",
  description: "Stay updated with the latest news, product updates, industry insights, and company announcements from Xiamen Union Spares Ltd.",
  keywords: "industrial news,product updates,industry insights,company news,spare parts news",
  openGraph: {
    title: "News | Xiamen Union Spares Ltd.",
    description: "Latest news and updates from Xiamen Union Spares Ltd.",
    url: "/news",
  },
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
