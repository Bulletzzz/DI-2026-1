import Link from "next/link"

const links = [
  { rotulo: "Dashboard",  href: "/dashboard"  },
  { rotulo: "Clientes",   href: "/clientes"   },
  { rotulo: "Produtos",   href: "/produtos"   },
  { rotulo: "Pedidos",    href: "/pedidos"    },
  { rotulo: "Relatórios", href: "/relatorios" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0f0f0f] border-b border-white/[0.06] flex items-center px-6 gap-8">
      <Link href="/dashboard" className="flex-shrink-0">
        <img src="/Logo.svg" alt="BEAST" className="h-8 w-auto" />
      </Link>

      <nav className="flex items-center gap-1 flex-1">
        {links.map(({ rotulo, href }) => (
          <Link
            key={href}
            href={href}
            className="px-3 py-1.5 text-sm text-[#808080] hover:text-white transition-colors duration-150 tracking-wide"
          >
            {rotulo}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#f97316] flex items-center justify-center text-[#0f0f0f] text-xs font-bold">
          B
        </div>
      </div>
    </header>
  )
}
