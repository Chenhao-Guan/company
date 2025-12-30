import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certificates | Xiamen Union Spares Ltd.",
  description: "View our quality certifications and compliance standards including ISO 9001:2015, ISO 14001:2015, OHSAS 18001:2007, and more. Committed to excellence and quality.",
  keywords: "certifications,ISO 9001,ISO 14001,OHSAS 18001,quality certificates,compliance,CE certification,diesel engine parts quality",
  openGraph: {
    title: "Certificates | Xiamen Union Spares Ltd.",
    description: "Our quality certifications and compliance standards",
    url: "https://xiamenunion.com/certificates",
    siteName: "Xiamen Union Spares Ltd.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xiamen Union Spares Ltd. Certificates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificates | Xiamen Union Spares Ltd.",
    description: "Our quality certifications and compliance standards",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://xiamenunion.com/certificates",
  },
}

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
