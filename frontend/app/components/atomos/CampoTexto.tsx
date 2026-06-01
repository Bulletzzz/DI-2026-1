interface PropsCampoTexto extends React.InputHTMLAttributes<HTMLInputElement> {
  rotulo: string
  erro?: string
}

export default function CampoTexto({ rotulo, erro, className = "", ...props }: PropsCampoTexto) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold tracking-widest text-[#808080] uppercase">
        {rotulo}
      </label>
      <input
        className={`
          w-full h-11 px-4 bg-[#1a1a1a] text-white text-sm font-body
          border ${erro ? "border-[#ef4444]" : "border-white/10"}
          outline-none transition-colors duration-150
          focus:border-[#f97316] placeholder:text-[#4d4d4d]
          ${className}
        `}
        {...props}
      />
      {erro && <span className="text-[#ef4444] text-xs">{erro}</span>}
    </div>
  )
}
