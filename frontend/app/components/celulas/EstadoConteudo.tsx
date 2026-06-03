import Spinner from "@/app/components/atomos/Spinner"

interface PropsEstadoConteudo {
  carregando: boolean
  erro: string | null
  aoTentar?: () => void
  children: React.ReactNode
}

export default function EstadoConteudo({ carregando, erro, aoTentar, children }: PropsEstadoConteudo) {
  if (carregando) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-[#ef4444] text-sm">{erro}</p>
        {aoTentar && (
          <button
            onClick={aoTentar}
            className="text-[10px] tracking-widest text-[#f97316] uppercase hover:underline"
          >
            Tentar novamente
          </button>
        )}
      </div>
    )
  }

  return <>{children}</>
}
