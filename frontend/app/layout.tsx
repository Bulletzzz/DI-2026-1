import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Bebas_Neue } from "next/font/google"
import TransicaoPagina from "@/app/components/organismos/TransicaoPagina"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

export const metadata: Metadata = {
  title: "BEAST",
  description: "Bernardo's Enterprise Analytics & Sales Tracker",
  icons: { icon: "/Logo.svg" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${bebas.variable}`}>
      <body>
        <TransicaoPagina>{children}</TransicaoPagina>
      </body>
    </html>
  )
}
