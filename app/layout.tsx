import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Xiamen Union Spares Ltd. - Professional Industrial Spare Parts Supplier",
  description:
    "Xiamen Union Spares Ltd. is a professional industrial equipment spare parts supplier, providing hydraulic systems, electrical control, mechanical transmission and other industrial spare parts and technical support services.",
  keywords:
    "industrial spare parts,hydraulic parts,electrical parts,mechanical parts,Xiamen spare parts,industrial equipment",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
