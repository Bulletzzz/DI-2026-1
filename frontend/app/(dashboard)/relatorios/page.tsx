"use client"

import { vendasPorMes, receitaPorProduto, projecaoReceita } from "@/app/servicos/analitica"
import { listarScores, resumoChurn } from "@/app/servicos/ia"
import { listarClientes } from "@/app/servicos/clientes"
import { useCarregar } from "@/app/ganchos/useCarregar"
import { formatarReais, formatarData } from "@/app/utilitarios/formato"
import GraficoBarras from "@/app/components/celulas/GraficoBarras"
import BarrasHorizontais from "@/app/components/celulas/BarrasHorizontais"
import Badge from "@/app/components/atomos/Badge"
import EstadoConteudo from "@/app/components/celulas/EstadoConteudo"

function SecaoRelatorio({ titulo, subtitulo, children }: { titulo: string; subtitulo: string; children: React.ReactNode }) {
  return (
    <section className="bg-[#1a1a1a] border border-white/[0.08] print:break-inside-avoid">
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <h2 className="font-display text-xl text-white tracking-wide">{titulo}</h2>
        <p className="text-[#4d4d4d] text-xs mt-0.5 tracking-wide uppercase">{subtitulo}</p>
      </div>
      <div className="p-6">{children}</div>
    </section>
  )
}

function LinhaTabel({ label, valor, destaque = false }: { label: string; valor: string; destaque?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
      <span className="text-sm text-[#808080]">{label}</span>
      <span className={`text-sm font-mono ${destaque ? "text-[#f97316] font-bold" : "text-[#cccccc]"}`}>{valor}</span>
    </div>
  )
}

export default function PaginaRelatorios() {
  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    const [meses, receitaProd, churn, scores, clientes, projecao] = await Promise.all([
      vendasPorMes(),
      receitaPorProduto(),
      resumoChurn(),
      listarScores(),
      listarClientes(),
      projecaoReceita(),
    ])
    return { meses, receitaProd, churn, scores, clientes, projecao }
  })

  const riscoTipo = (r: string) => r === "alto" ? "erro" : r === "medio" ? "aviso" : "sucesso"

  return (
    <div className="area-relatorio p-8 animar-entrada">
      <div className="cabecalho-pdf hidden items-end justify-between pb-6 mb-8 border-b-2 border-[#0f0f0f]">
        <div>
          <p className="font-display text-4xl tracking-[0.15em] text-[#0f0f0f]">BEAST</p>
          <p className="text-xs tracking-widest uppercase text-[#666]">Relatório Gerencial e de Decisão Estratégica</p>
        </div>
        <p className="text-xs text-[#666]">Gerado em {new Date().toLocaleDateString("pt-BR")}</p>
      </div>

      <div className="flex items-start justify-between mb-8 print:hidden">
        <div>
          <h1 className="font-display text-5xl text-white tracking-wide">RELATÓRIOS</h1>
          <p className="text-[#4d4d4d] text-sm mt-1">Gerado em {new Date().toLocaleDateString("pt-BR")}</p>
        </div>
        <button onClick={() => window.print()} className="no-print flex items-center gap-2 text-[#f97316] text-xs tracking-widest uppercase hover:underline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Exportar PDF
        </button>
      </div>

      <EstadoConteudo carregando={carregando} erro={erro} aoTentar={recarregar}>
        {dados && (() => {
          const receitaTotal = dados.meses.reduce((acc, v) => acc + v.total, 0)
          const faixasScoring = dados.churn.distribuicaoScoring.map(f => ({ rotulo: f.faixa, valor: f.quantidade }))
          const cliente = (id: number) => dados.clientes.find(c => c.id === id)
          const ordem = { alto: 0, medio: 1, baixo: 2 }
          const clientesChurn = dados.scores.slice().sort((a, b) => ordem[a.riscoChurn] - ordem[b.riscoChurn])

          return (
            <div className="grid grid-cols-1 gap-6">
              <SecaoRelatorio titulo="GERENCIAL 01 — VENDAS POR PERÍODO" subtitulo="Relatório gerencial · Receita mensal acumulada">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div>
                    <GraficoBarras dados={dados.meses.map(v => ({ rotulo: v.mes, valor: v.total }))} formatarValor={formatarReais} />
                  </div>
                  <div>
                    {dados.meses.map(({ mes, total }) => (
                      <LinhaTabel key={mes} label={mes} valor={formatarReais(total)} />
                    ))}
                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between">
                      <span className="text-sm font-bold text-white">Total</span>
                      <span className="text-sm font-mono font-bold text-[#f97316]">{formatarReais(receitaTotal)}</span>
                    </div>
                  </div>
                </div>
              </SecaoRelatorio>

              <SecaoRelatorio titulo="GERENCIAL 02 — RANKING DE PRODUTOS" subtitulo="Relatório gerencial · Desempenho por produto">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div>
                    <BarrasHorizontais
                      dados={dados.receitaProd.slice(0, 5).map(r => ({ rotulo: r.nome, valor: r.quantidade }))}
                      formatarValor={v => `${v} un.`}
                    />
                  </div>
                  <div>
                    {dados.receitaProd.map(({ produtoId, nome, quantidade, receita }, i) => (
                      <div key={produtoId} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                        <span className="font-mono text-[10px] text-[#4d4d4d] w-5">{i + 1}º</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{nome}</p>
                          <p className="text-[10px] text-[#4d4d4d]">{quantidade} unidades vendidas</p>
                        </div>
                        <span className="font-mono text-sm text-[#f97316] shrink-0">{formatarReais(receita)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SecaoRelatorio>

              <SecaoRelatorio titulo="DECISÃO 01 — ANÁLISE DE CHURN" subtitulo="Relatório estratégico · Risco de cancelamento por aluno">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {(["alto", "medio", "baixo"] as const).map(risco => {
                        const count = dados.churn[risco]
                        const tipo = riscoTipo(risco) as "sucesso" | "erro" | "aviso"
                        return (
                          <div key={risco} className={`p-4 border ${risco === "alto" ? "border-[#ef4444]/20 bg-[#ef4444]/5" : risco === "medio" ? "border-[#f59e0b]/20 bg-[#f59e0b]/5" : "border-[#22c55e]/20 bg-[#22c55e]/5"}`}>
                            <Badge tipo={tipo}>{risco}</Badge>
                            <p className="font-display text-3xl text-white mt-2">{count}</p>
                            <p className="text-[10px] text-[#4d4d4d]">alunos</p>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-[10px] text-[#4d4d4d] uppercase tracking-widest mb-4">Distribuição de scoring</p>
                    <BarrasHorizontais dados={faixasScoring} formatarValor={v => `${v} alunos`} />
                  </div>
                  <div>
                    {clientesChurn.map(score => {
                      const c = cliente(score.clienteId)
                      if (!c) return null
                      return (
                        <div key={score.clienteId} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{c.nome}</p>
                            <p className="text-[10px] text-[#4d4d4d]">Último pedido: {formatarData(score.ultimoPedido)}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge tipo={riscoTipo(score.riscoChurn) as "sucesso" | "erro" | "aviso"}>{score.riscoChurn}</Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </SecaoRelatorio>

              <SecaoRelatorio titulo="DECISÃO 02 — PROJEÇÃO DE RECEITA" subtitulo="Relatório estratégico · Receita projetada via scoring de propensão">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <LinhaTabel label="Receita atual acumulada" valor={formatarReais(dados.projecao.receitaAtual)} />
                    <LinhaTabel label="Ticket médio por aluno" valor={formatarReais(dados.projecao.ticketMedio)} />
                    <LinhaTabel label="Alunos com alto scoring (≥75)" valor={String(dados.projecao.clientesAltoScoring)} />
                    <LinhaTabel label="Receita projetada (scoring ponderado)" valor={formatarReais(dados.projecao.receitaProjetada)} destaque />
                    <LinhaTabel label="Alunos em risco de churn (alto)" valor={String(dados.projecao.clientesRiscoAlto)} />
                    <LinhaTabel label="Receita em risco" valor={formatarReais(dados.projecao.receitaEmRisco)} />
                  </div>
                  <div>
                    <BarrasHorizontais
                      dados={dados.clientes
                        .map(c => ({ rotulo: c.nome.split(" ")[0], valor: dados.scores.find(s => s.clienteId === c.id)?.scoring ?? 0 }))
                        .sort((a, b) => b.valor - a.valor)
                        .slice(0, 8)
                      }
                      formatarValor={v => `${v}/100`}
                    />
                  </div>
                </div>
              </SecaoRelatorio>
            </div>
          )
        })()}
      </EstadoConteudo>
    </div>
  )
}
