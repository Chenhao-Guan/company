import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | Xiamen Union Spares Ltd.",
  description: "Browse our comprehensive catalog of industrial spare parts including cylinder covers, pistons, cylinder liners, bearings, crankshafts, and connecting rods. High-quality components for marine, locomotive, and industrial diesel engines.",
  keywords: "industrial products,cylinder cover,piston,cylinder liner,bearing,crankshaft,connecting rod,marine parts,engine parts,diesel engine parts,EMD,Sulzer,MAN,Wärtsilä",
  openGraph: {
    title: "Products | Xiamen Union Spares Ltd.",
    description: "Comprehensive catalog of industrial spare parts for diesel engines",
    url: "https://xiamenunion.com/products",
    siteName: "Xiamen Union Spares Ltd.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xiamen Union Spares Ltd. Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Xiamen Union Spares Ltd.",
    description: "Comprehensive catalog of industrial spare parts for diesel engines",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://xiamenunion.com/products",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
