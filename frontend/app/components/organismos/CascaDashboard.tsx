"use client"

import { useState } from "react"
import Sidebar from "@/app/components/organismos/Sidebar"
import Footer from "@/app/components/organismos/Footer"

export default function CascaDashboard({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar aberto={menuAberto} aoFechar={() => setMenuAberto(false)} />

      {menuAberto && (
        <div
          onClick={() => setMenuAberto(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      <div className="casca-conteudo flex-1 lg:ml-60 flex flex-col min-h-screen min-w-0">
        <header className="no-print sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-[#0f0f0f] border-b border-white/[0.06] lg:hidden">
          <button
            onClick={() => setMenuAberto(true)}
            className="text-[#cccccc] hover:text-[#f97316] transition-colors p-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <img src="/Logo.svg" alt="BEAST" className="h-8 w-auto" />
        </header>

        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
