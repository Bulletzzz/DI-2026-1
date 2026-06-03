"use client"

import Link from "next/link"
import { listarScores } from "@/app/servicos/ia"
import { listarClientes } from "@/app/servicos/clientes"
import { listarProdutos } from "@/app/servicos/produtos"
import { topProdutos } from "@/app/servicos/analitica"
import { useCarregar } from "@/app/ganchos/useCarregar"
import { formatarReais, formatarData } from "@/app/utilitarios/formato"
import type { Cliente, ScoreCliente } from "@/app/tipos"
import Badge from "@/app/components/atomos/Badge"
import CardStat from "@/app/components/celulas/CardStat"
import EstadoConteudo from "@/app/components/celulas/EstadoConteudo"

function CardAluno({ score, cliente }: { score: ScoreCliente; cliente?: Cliente }) {
  if (!cliente) return null

  const riscoTipo = score.riscoChurn === "alto" ? "erro" : score.riscoChurn === "medio" ? "aviso" : "sucesso"
  const scoringCor = score.scoring >= 75 ? "#22c55e" : score.scoring >= 50 ? "#f59e0b" : "#ef4444"

  return (
    <Link
      href={`/clientes/${cliente.id}`}
      className="flex flex-col gap-3 p-4 bg-[#0f0f0f] border border-white/[0.06] hover:border-white/20 transition-colors duration-150 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm text-white font-medium truncate group-hover:text-[#f97316] transition-colors">{cliente.nome}</p>
          <p className="text-[10px] text-[#4d4d4d] truncate">{cliente.cidade}, {cliente.estado}</p>
        </div>
        <Badge tipo={riscoTipo as "sucesso" | "erro" | "aviso"}>{score.riscoChurn}</Badge>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-[#262626]">
          <div className="h-full transition-all duration-500" style={{ width: `${score.scoring}%`, backgroundColor: scoringCor }} />
        </div>
        <span className="text-[10px] font-mono shrink-0" style={{ color: scoringCor }}>{score.scoring}</span>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#4d4d4d]">
        <span>{score.totalPedidos} pedidos · {formatarReais(score.ticketMedio)} médio</span>
        <span>{formatarData(score.ultimoPedido)}</span>
      </div>
    </Link>
  )
}

function SecaoDecisao({ titulo, subtitulo, acento, children }: {
  titulo: string
  subtitulo: string
  acento: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#1a1a1a] border border-white/[0.08]" style={{ borderTopColor: acento, borderTopWidth: 2 }}>
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <h2 className="font-display text-2xl text-white tracking-wide">{titulo}</h2>
        <p className="text-[#4d4d4d] text-xs mt-1 tracking-wide uppercase">{subtitulo}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export default function PaginaDecisao() {
  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    const [scores, clientes, produtos, top] = await Promise.all([
      listarScores(),
      listarClientes(),
      listarProdutos(),
      topProdutos(1),
    ])
    return { scores, clientes, produtos, top }
  })

  return (
    <div className="p-8 animar-entrada">
      <div className="mb-10">
        <h1 className="font-display text-5xl text-white tracking-wide">DECISÃO ESTRATÉGICA</h1>
        <p className="text-[#4d4d4d] text-sm mt-1">Análise gerada por Random Forest · Modelo de classificação de churn e scoring</p>
      </div>

      <EstadoConteudo carregando={carregando} erro={erro} aoTentar={recarregar}>
        {dados && (() => {
          const cliente = (id: number) => dados.clientes.find(c => c.id === id)
          const altosRisco = dados.scores.filter(s => s.riscoChurn === "alto").sort((a, b) => a.scoring - b.scoring)
          const altoScoring = dados.scores.filter(s => s.scoring >= 70).sort((a, b) => b.scoring - a.scoring)
          const receitaEmRisco = altosRisco.reduce((acc, s) => acc + s.ticketMedio, 0)
          const receitaProjetada = altoScoring.reduce((acc, s) => acc + s.ticketMedio * (s.scoring / 100), 0)
          const produtoMaisVendido = dados.produtos.find(p => p.id === dados.top[0]?.produtoId)

          return (
            <>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <CardStat rotulo="Em Risco Alto" valor={String(altosRisco.length)} descricao="alunos críticos" destaque />
                <CardStat rotulo="Receita em Risco" valor={formatarReais(receitaEmRisco)} descricao="potencial de perda" />
                <CardStat rotulo="Alta Propensão" valor={String(altoScoring.length)} descricao="scoring ≥ 70" />
                <CardStat rotulo="Receita Projetada" valor={formatarReais(receitaProjetada)} descricao="via scoring ponderado" />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <SecaoDecisao titulo="RISCO ALTO DE CHURN" subtitulo="Alunos com maior probabilidade de cancelamento" acento="#ef4444">
                  <div className="flex flex-col gap-3">
                    {altosRisco.map(s => <CardAluno key={s.clienteId} score={s} cliente={cliente(s.clienteId)} />)}
                    {altosRisco.length === 0 && <p className="text-[#4d4d4d] text-sm">Nenhum aluno em risco alto.</p>}
                  </div>
                </SecaoDecisao>

                <SecaoDecisao titulo="ALTA PROPENSÃO À COMPRA" subtitulo="Alunos com maior scoring de recompra" acento="#22c55e">
                  <div className="flex flex-col gap-3">
                    {altoScoring.map(s => <CardAluno key={s.clienteId} score={s} cliente={cliente(s.clienteId)} />)}
                    {altoScoring.length === 0 && <p className="text-[#4d4d4d] text-sm">Nenhum aluno com alto scoring.</p>}
                  </div>
                </SecaoDecisao>
              </div>

              <SecaoDecisao titulo="INSIGHTS DO MODELO" subtitulo="Recomendações baseadas nos dados" acento="#f97316">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2 p-4 bg-[#0f0f0f] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span className="text-[10px] text-[#ef4444] uppercase tracking-widest font-bold">Atenção</span>
                    </div>
                    <p className="text-sm text-[#cccccc]">{altosRisco.length} aluno{altosRisco.length !== 1 ? "s" : ""} com alto risco de churn representam {formatarReais(receitaEmRisco)} em receita recorrente.</p>
                    <p className="text-xs text-[#4d4d4d] mt-1">Recomendação: contato ativo com oferta de desconto para renovação de plano.</p>
                  </div>

                  <div className="flex flex-col gap-2 p-4 bg-[#0f0f0f] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                      </svg>
                      <span className="text-[10px] text-[#22c55e] uppercase tracking-widest font-bold">Oportunidade</span>
                    </div>
                    <p className="text-sm text-[#cccccc]">{altoScoring.length} aluno{altoScoring.length !== 1 ? "s" : ""} com scoring ≥ 70 têm alta chance de recompra com receita projetada de {formatarReais(receitaProjetada)}.</p>
                    <p className="text-xs text-[#4d4d4d] mt-1">Recomendação: campanha de upsell de plano anual e suplementos combinados.</p>
                  </div>

                  <div className="flex flex-col gap-2 p-4 bg-[#0f0f0f] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round">
                        <path d="M10 1L2 10h7l-1 7 9-10h-7l1-7z" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10px] text-[#f97316] uppercase tracking-widest font-bold">Produto Destaque</span>
                    </div>
                    <p className="text-sm text-[#cccccc]">
                      {produtoMaisVendido ? `${produtoMaisVendido.nome} é o produto mais vendido com valor de ${formatarReais(produtoMaisVendido.preco)}.` : "Dados insuficientes."}
                    </p>
                    <p className="text-xs text-[#4d4d4d] mt-1">Recomendação: bundle com suplementos para aumentar ticket médio nos próximos pedidos.</p>
                  </div>
                </div>
              </SecaoDecisao>
            </>
          )
        })()}
      </EstadoConteudo>
    </div>
  )
}
