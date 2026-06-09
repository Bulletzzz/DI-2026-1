interface Dado {
  rotulo: string
  valor: number
}

interface PropsBarrasHorizontais {
  dados: Dado[]
  formatarValor?: (v: number) => string
}

export default function BarrasHorizontais({ dados, formatarValor }: PropsBarrasHorizontais) {
  const maximo = Math.max(...dados.map(d => d.valor))
  const formatar = formatarValor ?? String

  return (
    <div className="flex flex-col gap-4 w-full">
      {dados.map(({ rotulo, valor }, indice) => {
        const largura = maximo > 0 ? (valor / maximo) * 100 : 0
        return (
          <div key={`${rotulo}-${indice}`} className="flex items-center gap-3">
            <span className="text-xs text-[#808080] w-36 truncate shrink-0">{rotulo}</span>
            <div className="flex-1 h-1.5 bg-[#262626]">
              <div
                className="h-full bg-[#f97316] transition-all duration-500"
                style={{ width: `${largura}%` }}
              />
            </div>
            <span className="text-xs text-[#cccccc] font-mono min-w-[2rem] text-right shrink-0 whitespace-nowrap">
              {formatar(valor)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
