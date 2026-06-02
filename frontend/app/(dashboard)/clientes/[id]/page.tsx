"use client"

import Link from "next/link"
import { clientes, pedidos, produtos, scoreClientes, formatarReais, formatarData } from "@/app/dados/mock"
import Badge from "@/app/components/atomos/Badge"
import CardStat from "@/app/components/celulas/CardStat"
import TabelaDados from "@/app/components/organismos/TabelaDados"

export default function PaginaCliente({ params }: { params: { id: string } }) {
  const clienteId = parseInt(params.id)
  const cliente = clientes.find(c => c.id === clienteId)
  const score = scoreClientes.find(s => s.clienteId === clienteId)
  const pedidosCliente = pedidos.filter(p => p.clienteId === clienteId)

  if (!cliente) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-96 gap-4">
        <span className="font-display text-6xl text-[#1a1a1a]">404</span>
        <p className="text-[#4d4d4d] text-sm">Aluno não encontrado</p>
        <Link href="/clientes" className="text-[#f97316] text-sm hover:underline">← Voltar</Link>
      </div>
    )
  }

  const riscoTipo = (r: string) => r === "alto" ? "erro" : r === "medio" ? "aviso" : "sucesso"
  const riscoDesc = { alto: "Este aluno tem alta probabilidade de não renovar o plano.", medio: "Monitorar engajamento — risco moderado de cancelamento.", baixo: "Aluno engajado com baixo risco de cancelamento." }
  const scoringDesc = (s: number) => s >= 75 ? "Alta propensão à compra" : s >= 50 ? "Propensão moderada" : "Baixa propensão à compra"

  const itensPedidos = pedidosCliente.map(p => ({
    id: `#${String(p.id).padStart(4, "0")}`,
    itens: p.itens.map(i => produtos.find(pr => pr.id === i.produtoId)?.nome ?? "-").join(", "),
    total: formatarReais(p.total),
    data: formatarData(p.criadoEm),
  }))

  const colunas = [
    { rotulo: "#", chave: "id", renderizar: (v: unknown) => <span className="font-mono text-[#4d4d4d]">{String(v)}</span> },
    { rotulo: "Itens", chave: "itens", renderizar: (v: unknown) => <span className="text-[#808080] text-xs">{String(v)}</span> },
    { rotulo: "Total", chave: "total", alinhamento: "direita" as const },
    { rotulo: "Data", chave: "data", alinhamento: "direita" as const, renderizar: (v: unknown) => <span className="text-[#666666]">{String(v)}</span> },
  ]

  return (
    <div className="p-8 animar-entrada">
      <div className="mb-8">
        <Link href="/clientes" className="text-[10px] tracking-widest text-[#4d4d4d] uppercase hover:text-[#f97316] transition-colors">
          ← Clientes
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-5xl text-white tracking-wide">{cliente.nome.toUpperCase()}</h1>
          <p className="text-[#808080] text-sm mt-1">{cliente.email}</p>
          <p className="text-[#4d4d4d] text-xs mt-0.5">{cliente.cidade}, {cliente.estado} — {cliente.pais}</p>
          <p className="text-[#4d4d4d] text-xs mt-0.5">Cliente desde {formatarData(cliente.criadoEm)}</p>
        </div>
        {score && (
          <Badge tipo={riscoTipo(score.riscoChurn) as "sucesso" | "erro" | "aviso"}>
            Churn {score.riscoChurn}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <CardStat rotulo="Total de Pedidos" valor={String(score?.totalPedidos ?? pedidosCliente.length)} />
        <CardStat rotulo="Ticket Médio" valor={formatarReais(score?.ticketMedio ?? 0)} />
        <CardStat rotulo="Último Pedido" valor={score ? formatarData(score.ultimoPedido) : "-"} />
        <CardStat rotulo="Scoring" valor={String(score?.scoring ?? "-")} descricao={score ? scoringDesc(score.scoring) : undefined} destaque={!!score && score.scoring >= 75} />
      </div>

      {score && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
          <div className={`bg-[#1a1a1a] border p-6 ${score.riscoChurn === "alto" ? "border-[#ef4444]/30" : score.riscoChurn === "medio" ? "border-[#f59e0b]/30" : "border-[#22c55e]/30"}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-white tracking-wide">RISCO DE CHURN</h2>
              <Badge tipo={riscoTipo(score.riscoChurn) as "sucesso" | "erro" | "aviso"}>{score.riscoChurn}</Badge>
            </div>
            <p className="text-[#808080] text-sm mb-4">{riscoDesc[score.riscoChurn]}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-[#262626]">
                <div
                  className={`h-full transition-all duration-500 ${score.riscoChurn === "alto" ? "bg-[#ef4444]" : score.riscoChurn === "medio" ? "bg-[#f59e0b]" : "bg-[#22c55e]"}`}
                  style={{ width: score.riscoChurn === "alto" ? "80%" : score.riscoChurn === "medio" ? "50%" : "20%" }}
                />
              </div>
              <span className="text-xs text-[#666666] w-12 text-right">
                {score.riscoChurn === "alto" ? "80%" : score.riscoChurn === "medio" ? "50%" : "20%"}
              </span>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#f97316]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-white tracking-wide">SCORING</h2>
              <span className="font-display text-4xl text-[#f97316]">{score.scoring}</span>
            </div>
            <p className="text-[#808080] text-sm mb-4">{scoringDesc(score.scoring)}</p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#4d4d4d] w-4">0</span>
              <div className="flex-1 h-2 bg-[#262626]">
                <div
                  className="h-full bg-[#f97316] transition-all duration-500"
                  style={{ width: `${score.scoring}%` }}
                />
              </div>
              <span className="text-[10px] text-[#4d4d4d] w-8 text-right">100</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-white/[0.08]">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h2 className="font-display text-xl text-white tracking-wide">HISTÓRICO DE PEDIDOS</h2>
        </div>
        <TabelaDados
          colunas={colunas}
          dados={itensPedidos as unknown as Record<string, unknown>[]}
          semDados="Nenhum pedido encontrado"
        />
      </div>
    </div>
  )
}
