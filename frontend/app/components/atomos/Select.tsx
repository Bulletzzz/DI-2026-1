interface Opcao {
  valor: string | number
  rotulo: string
}

interface PropsSelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
  rotulo?: string
  opcoes: Opcao[]
  erro?: string
}

export default function Select({ rotulo, opcoes, erro, className = "", ...props }: PropsSelect) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {rotulo && (
        <label className="text-xs font-semibold tracking-widest text-[#808080] uppercase">
          {rotulo}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            w-full h-11 px-4 pr-10 bg-[#1a1a1a] text-white text-sm
            border ${erro ? "border-[#ef4444]" : "border-white/10"}
            outline-none transition-colors duration-150 cursor-pointer
            focus:border-[#f97316] appearance-none
            ${className}
          `}
          {...props}
        >
          {opcoes.map(({ valor, rotulo: r }) => (
            <option key={valor} value={valor} className="bg-[#1a1a1a]">
              {r}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666666]"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {erro && <span className="text-[#ef4444] text-xs">{erro}</span>}
    </div>
  )
}
