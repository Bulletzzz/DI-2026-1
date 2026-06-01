type VarianteBotao = "primario" | "fantasma" | "perigo"

interface PropsBotao extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBotao
  carregando?: boolean
}

const estilos: Record<VarianteBotao, string> = {
  primario: "bg-[#f97316] text-[#0f0f0f] hover:bg-[#ea6a0a] active:scale-[0.98]",
  fantasma: "bg-transparent border border-white/20 text-white hover:bg-white/5 active:scale-[0.98]",
  perigo:   "bg-[#ef4444] text-white hover:bg-[#dc2626] active:scale-[0.98]",
}

export default function Botao({
  variante = "primario",
  carregando = false,
  children,
  className = "",
  disabled,
  ...props
}: PropsBotao) {
  return (
    <button
      disabled={disabled || carregando}
      className={`
        inline-flex items-center justify-center gap-2
        h-11 px-6 font-body font-semibold text-sm tracking-wide
        transition-all duration-200 ease-out cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${estilos[variante]} ${className}
      `}
      {...props}
    >
      {carregando ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
          </path>
        </svg>
      ) : children}
    </button>
  )
}
