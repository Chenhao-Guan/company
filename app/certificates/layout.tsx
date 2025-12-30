import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certificates",
  description: "View our quality certifications and compliance standards including ISO 9001:2015, ISO 14001:2015, OHSAS 18001:2007, and more. Committed to excellence and quality.",
  keywords: "certifications,ISO 9001,ISO 14001,OHSAS 18001,quality certificates,compliance,CE certification",
  openGraph: {
    title: "Certificates | Xiamen Union Spares Ltd.",
    description: "Our quality certifications and compliance standards",
    url: "/certificates",
  },
}

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
