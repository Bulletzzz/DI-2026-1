"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  {
    rotulo: "Dashboard",
    href: "/dashboard",
    icone: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" />
        <rect x="11" y="1" width="6" height="6" />
        <rect x="1" y="11" width="6" height="6" />
        <rect x="11" y="11" width="6" height="6" />
      </svg>
    ),
  },
  {
    rotulo: "Clientes",
    href: "/clientes",
    icone: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="5.5" r="3" />
        <path d="M2 17c0-4 3.1-6 7-6s7 2 7 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    rotulo: "Produtos",
    href: "/produtos",
    icone: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 1L17 5v8L9 17 1 13V5L9 1z" />
        <path d="M9 1v16M1 5l8 4 8-4" />
      </svg>
    ),
  },
  {
    rotulo: "Categorias",
    href: "/categorias",
    icone: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 1H1v9L9.5 18 17 10.5 8 1.5" strokeLinejoin="round" />
        <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    rotulo: "Pedidos",
    href: "/pedidos",
    icone: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 1h12v16l-2-1.5L11 17l-2-1.5L7 17l-2-1.5L3 17V1z" strokeLinejoin="round" />
        <path d="M6 7h6M6 10.5h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    rotulo: "Relatórios",
    href: "/relatorios",
    icone: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 17h16" strokeLinecap="round" />
        <rect x="2.5" y="9"  width="3" height="8" />
        <rect x="7.5" y="5"  width="3" height="12" />
        <rect x="12.5" y="2" width="3" height="15" />
      </svg>
    ),
  },
  {
    rotulo: "Decisão Est.",
    href: "/decisao",
    icone: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 1L2 10h7l-1 7 9-10h-7l1-7z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#0f0f0f] border-r border-white/[0.06] flex flex-col z-40">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.06]">
        <img src="/Logo.svg" alt="BEAST" className="h-11 w-auto" />
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navLinks.map(({ rotulo, href, icone }) => {
          const ativo = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-5 py-2.5 text-sm transition-colors duration-150
                border-l-2 mx-0
                ${ativo
                  ? "border-[#f97316] text-[#f97316] bg-[#f97316]/5"
                  : "border-transparent text-[#666666] hover:text-[#cccccc] hover:bg-white/[0.02]"
                }
              `}
            >
              {icone}
              <span className="tracking-wide">{rotulo}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 bg-[#f97316] flex items-center justify-center text-[#0f0f0f] text-xs font-bold shrink-0">
          B
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-white truncate">Bernardo Manga</span>
          <span className="text-[10px] text-[#4d4d4d] truncate">Admin</span>
        </div>
      </div>
    </aside>
  )
}
