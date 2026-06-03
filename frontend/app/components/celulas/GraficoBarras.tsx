interface Dado {
  rotulo: string
  valor: number
}

interface PropsGraficoBarras {
  dados: Dado[]
  formatarValor?: (v: number) => string
}

export default function GraficoBarras({ dados, formatarValor }: PropsGraficoBarras) {
  const maximo = Math.max(...dados.map(d => d.valor))
  const formatar = formatarValor ?? String

  return (
    <div className="flex items-end gap-1.5 h-48 w-full">
      {dados.map(({ rotulo, valor }) => {
        const altura = maximo > 0 ? (valor / maximo) * 100 : 0
        return (
          <div key={rotulo} className="flex flex-col items-center gap-2 flex-1 h-full group">
            <div className="relative flex-1 w-full">
              <span
                className="absolute left-1/2 -translate-x-1/2 text-[10px] text-[#f97316] opacity-0 group-hover:opacity-100 print:opacity-100 transition-opacity whitespace-nowrap"
                style={{ bottom: `calc(${Math.max(altura, 2)}% + 4px)` }}
              >
                {formatar(valor)}
              </span>
              <div
                className="absolute bottom-0 inset-x-0 bg-[#f97316]/30 group-hover:bg-[#f97316]/60 print:bg-[#f97316] transition-colors duration-200"
                style={{ height: `${Math.max(altura, 2)}%` }}
              />
            </div>
            <span className="text-[10px] text-[#4d4d4d] font-mono">{rotulo}</span>
          </div>
        )
      })}
    </div>
  )
}
