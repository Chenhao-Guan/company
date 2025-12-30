import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our comprehensive catalog of industrial spare parts including cylinder covers, pistons, cylinder liners, bearings, crankshafts, and connecting rods. High-quality components for all industrial applications.",
  keywords: "industrial products,cylinder cover,piston,cylinder liner,bearing,crankshaft,connecting rod,marine parts,engine parts",
  openGraph: {
    title: "Products | Xiamen Union Spares Ltd.",
    description: "Comprehensive catalog of industrial spare parts",
    url: "/products",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
