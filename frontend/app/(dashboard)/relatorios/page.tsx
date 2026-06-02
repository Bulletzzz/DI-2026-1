"use client"

import { clientes, pedidos, produtos, scoreClientes, vendasPorMes as vendasMesRaw, vendasPorEstado, formatarReais, formatarData } from "@/app/dados/mock"
import GraficoBarras from "@/app/components/celulas/GraficoBarras"
import BarrasHorizontais from "@/app/components/celulas/BarrasHorizontais"
import Badge from "@/app/components/atomos/Badge"

function SecaoRelatorio({ titulo, subtitulo, children }: { titulo: string; subtitulo: string; children: React.ReactNode }) {
  return (
    <section className="bg-[#1a1a1a] border border-white/[0.08]">
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
  const vendasPorMes = vendasMesRaw.map(v => ({ rotulo: v.mes, valor: v.total }))
  const receitaTotal = pedidos.reduce((acc, p) => acc + p.total, 0)
  const ticketMedio = receitaTotal / clientes.length

  const contagemProdutos: Record<number, { qtd: number; receita: number }> = {}
  pedidos.forEach(p => {
    p.itens.forEach(item => {
      if (!contagemProdutos[item.produtoId]) contagemProdutos[item.produtoId] = { qtd: 0, receita: 0 }
      const produto = produtos.find(pr => pr.id === item.produtoId)
      contagemProdutos[item.produtoId].qtd += item.quantidade
      contagemProdutos[item.produtoId].receita += (produto?.preco ?? 0) * item.quantidade
    })
  })

  const rankingProdutos = produtos
    .map(p => ({
      produto: p,
      qtd: contagemProdutos[p.id]?.qtd ?? 0,
      receita: contagemProdutos[p.id]?.receita ?? 0,
    }))
    .sort((a, b) => b.receita - a.receita)

  const receitaPorEstado = vendasPorEstado.sort((a, b) => b.total - a.total)

  const clientesChurn = clientes
    .map(c => ({ cliente: c, score: scoreClientes.find(s => s.clienteId === c.id) }))
    .filter(x => x.score)
    .sort((a, b) => {
      const ordem = { alto: 0, medio: 1, baixo: 2 }
      return ordem[a.score!.riscoChurn] - ordem[b.score!.riscoChurn]
    })

  const riscoTipo = (r: string) => r === "alto" ? "erro" : r === "medio" ? "aviso" : "sucesso"

  const projecaoReceita = clientes.reduce((acc, c) => {
    const s = scoreClientes.find(x => x.clienteId === c.id)
    if (!s) return acc
    return acc + (s.ticketMedio * (s.scoring / 100))
  }, 0)

  return (
    <div className="p-8 animar-entrada">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-5xl text-white tracking-wide">RELATÓRIOS</h1>
          <p className="text-[#4d4d4d] text-sm mt-1">Gerado em {new Date().toLocaleDateString("pt-BR")}</p>
        </div>
        <button className="flex items-center gap-2 text-[#f97316] text-xs tracking-widest uppercase hover:underline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SecaoRelatorio titulo="GERENCIAL 01 — VENDAS POR PERÍODO" subtitulo="Relatório gerencial · Receita mensal acumulada">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
              <GraficoBarras dados={vendasPorMes} formatarValor={formatarReais} />
            </div>
            <div>
              {vendasMesRaw.map(({ mes, total }) => (
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
                dados={rankingProdutos.slice(0, 5).map(r => ({ rotulo: r.produto.nome, valor: r.qtd }))}
                formatarValor={v => `${v} un.`}
              />
            </div>
            <div>
              {rankingProdutos.map(({ produto, qtd, receita }, i) => (
                <div key={produto.id} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                  <span className="font-mono text-[10px] text-[#4d4d4d] w-5">{i + 1}º</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{produto.nome}</p>
                    <p className="text-[10px] text-[#4d4d4d]">{qtd} unidades vendidas</p>
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
                  const count = scoreClientes.filter(s => s.riscoChurn === risco).length
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
              <BarrasHorizontais
                dados={vendasPorEstado.slice(0, 5).map(v => ({ rotulo: v.estado, valor: v.total }))}
                formatarValor={formatarReais}
              />
            </div>
            <div>
              {clientesChurn.map(({ cliente, score }) => (
                <div key={cliente.id} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{cliente.nome}</p>
                    <p className="text-[10px] text-[#4d4d4d]">Último pedido: {formatarData(score!.ultimoPedido)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge tipo={riscoTipo(score!.riscoChurn) as "sucesso" | "erro" | "aviso"}>{score!.riscoChurn}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SecaoRelatorio>

        <SecaoRelatorio titulo="DECISÃO 02 — PROJEÇÃO DE RECEITA" subtitulo="Relatório estratégico · Receita projetada via scoring de propensão">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <LinhaTabel label="Receita atual acumulada" valor={formatarReais(receitaTotal)} />
              <LinhaTabel label="Ticket médio por aluno" valor={formatarReais(ticketMedio)} />
              <LinhaTabel label="Alunos com alto scoring (≥75)" valor={String(scoreClientes.filter(s => s.scoring >= 75).length)} />
              <LinhaTabel label="Receita projetada (scoring ponderado)" valor={formatarReais(projecaoReceita)} destaque />
              <LinhaTabel label="Alunos em risco de churn (alto)" valor={String(scoreClientes.filter(s => s.riscoChurn === "alto").length)} />
              <LinhaTabel label="Receita em risco" valor={formatarReais(
                scoreClientes.filter(s => s.riscoChurn === "alto").reduce((acc, s) => acc + s.ticketMedio, 0)
              )} />
            </div>
            <div>
              <BarrasHorizontais
                dados={clientes
                  .map(c => ({ rotulo: c.nome.split(" ")[0], valor: scoreClientes.find(s => s.clienteId === c.id)?.scoring ?? 0 }))
                  .sort((a, b) => b.valor - a.valor)
                  .slice(0, 8)
                }
                formatarValor={v => `${v}/100`}
              />
            </div>
          </div>
        </SecaoRelatorio>
      </div>
    </div>
  )
}
