"use client"

import { useEffect } from "react"

interface PropsModal {
  aberto: boolean
  onFechar: () => void
  titulo: string
  children: React.ReactNode
  largura?: string
}

export default function Modal({ aberto, onFechar, titulo, children, largura = "max-w-lg" }: PropsModal) {
  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar()
    }
    if (aberto) document.addEventListener("keydown", tecla)
    return () => document.removeEventListener("keydown", tecla)
  }, [aberto, onFechar])

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onFechar} />
      <div className={`relative z-10 w-full ${largura} bg-[#111111] border border-white/[0.08] animar-entrada`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 className="font-display text-2xl text-white tracking-wide">{titulo}</h2>
          <button onClick={onFechar} className="text-[#666666] hover:text-white transition-colors p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
