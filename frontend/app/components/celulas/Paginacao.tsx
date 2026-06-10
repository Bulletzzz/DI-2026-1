"use client"

interface PropsPaginacao {
  pagina: number
  totalPaginas: number
  total: number
  inicio: number
  quantidade: number
  aoIr: (pagina: number) => void
}

export default function Paginacao({ pagina, totalPaginas, total, inicio, quantidade, aoIr }: PropsPaginacao) {
  if (total === 0) return null

  const botao = "w-8 h-8 flex items-center justify-center border border-white/10 text-[#cccccc] hover:border-[#f97316] hover:text-[#f97316] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-[#cccccc]"

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
      <span className="text-xs text-[#666666]">
        Mostrando <span className="text-[#cccccc] font-mono">{inicio + 1}–{inicio + quantidade}</span> de <span className="text-[#cccccc] font-mono">{total}</span>
      </span>
      <div className="flex items-center gap-2">
        <button onClick={() => aoIr(pagina - 1)} disabled={pagina <= 1} className={botao} aria-label="Página anterior">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span className="text-xs text-[#808080] font-mono min-w-[4rem] text-center">{pagina} / {totalPaginas}</span>
        <button onClick={() => aoIr(pagina + 1)} disabled={pagina >= totalPaginas} className={botao} aria-label="Próxima página">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  )
}
