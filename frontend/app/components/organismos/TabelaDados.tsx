"use client"

export interface Coluna {
  rotulo: string
  chave: string
  renderizar?: (valor: unknown, linha: Record<string, unknown>) => React.ReactNode
  alinhamento?: "esquerda" | "direita" | "centro"
}

interface PropsTabelaDados {
  colunas: Coluna[]
  dados: Record<string, unknown>[]
  aoClicarLinha?: (linha: Record<string, unknown>) => void
  semDados?: string
}

const alinhar = {
  esquerda: "text-left",
  direita:  "text-right",
  centro:   "text-center",
}

export default function TabelaDados({ colunas, dados, aoClicarLinha, semDados = "Nenhum dado encontrado" }: PropsTabelaDados) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#111111]">
            {colunas.map((col, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-[10px] font-semibold tracking-widest text-[#666666] uppercase border-b border-white/[0.06] ${alinhar[col.alinhamento ?? "esquerda"]}`}
              >
                {col.rotulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.length === 0 ? (
            <tr>
              <td colSpan={colunas.length} className="px-4 py-12 text-center text-[#4d4d4d] text-sm">
                {semDados}
              </td>
            </tr>
          ) : (
            dados.map((linha, i) => (
              <tr
                key={i}
                onClick={() => aoClicarLinha?.(linha)}
                className={`border-b border-white/[0.04] transition-colors duration-100 ${aoClicarLinha ? "cursor-pointer hover:bg-white/[0.02]" : ""}`}
              >
                {colunas.map((col, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 text-sm text-[#cccccc] ${alinhar[col.alinhamento ?? "esquerda"]}`}
                  >
                    {col.renderizar
                      ? col.renderizar(linha[col.chave], linha)
                      : String(linha[col.chave] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
