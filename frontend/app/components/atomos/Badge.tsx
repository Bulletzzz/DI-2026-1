type TipoBadge = "sucesso" | "erro" | "aviso" | "neutro" | "primario"

interface PropsBadge {
  tipo?: TipoBadge
  children: React.ReactNode
}

const estilos: Record<TipoBadge, string> = {
  sucesso:  "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20",
  erro:     "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20",
  aviso:    "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20",
  neutro:   "bg-white/[0.06] text-[#808080] border border-white/[0.08]",
  primario: "bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20",
}

export default function Badge({ tipo = "neutro", children }: PropsBadge) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${estilos[tipo]}`}>
      {children}
    </span>
  )
}
