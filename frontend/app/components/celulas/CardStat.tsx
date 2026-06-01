interface PropsCardStat {
  rotulo: string
  valor: string
  descricao?: string
  destaque?: boolean
}

export default function CardStat({ rotulo, valor, descricao, destaque = false }: PropsCardStat) {
  return (
    <div className={`flex flex-col gap-3 p-5 bg-[#1a1a1a] border ${destaque ? "border-[#f97316]/30" : "border-white/[0.08]"}`}>
      <span className="text-[10px] font-semibold tracking-widest text-[#666666] uppercase">
        {rotulo}
      </span>
      <span className={`font-display leading-none ${destaque ? "text-[#f97316] text-5xl" : "text-white text-4xl"}`}>
        {valor}
      </span>
      {descricao && (
        <span className="text-xs text-[#4d4d4d]">{descricao}</span>
      )}
    </div>
  )
}
