"use client"

import Link from "next/link"
import { clientes, pedidos, produtos, scoreClientes, vendasPorMes as vendasMesRaw, vendasPorLocal, formatarReais, formatarData } from "@/app/dados/mock"
import CardStat from "@/app/components/celulas/CardStat"
import GraficoBarras from "@/app/components/celulas/GraficoBarras"
import BarrasHorizontais from "@/app/components/celulas/BarrasHorizontais"
import TabelaDados from "@/app/components/organismos/TabelaDados"
import Badge from "@/app/components/atomos/Badge"

export default function PaginaDashboard() {
  const receitaTotal = pedidos.reduce((acc, p) => acc + p.total, 0)
  const ticketMedio = receitaTotal / clientes.length
  const altosRisco = scoreClientes.filter(s => s.riscoChurn === "alto").length
  const taxaChurn = ((altosRisco / clientes.length) * 100).toFixed(0)

  const vendasPorMes = vendasMesRaw.map(v => ({ rotulo: v.mes, valor: v.total }))

  const vendasCidade = vendasPorLocal("cidade").slice(0, 6).map(v => ({ rotulo: v.rotulo, valor: v.total }))

  const receitaPorProduto = produtos
    .map(p => {
      const receita = pedidos.reduce((acc, pedido) => {
        const item = pedido.itens.find(i => i.produtoId === p.id)
        return acc + (item ? item.quantidade * p.preco : 0)
      }, 0)
      return { rotulo: p.nome, valor: receita }
    })
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 6)

  const contagemProdutos: Record<number, number> = {}
  pedidos.forEach(p => {
    p.itens.forEach(item => {
      contagemProdutos[item.produtoId] = (contagemProdutos[item.produtoId] || 0) + item.quantidade
    })
  })
  const topProdutos = produtos
    .map(p => ({ rotulo: p.nome, valor: contagemProdutos[p.id] || 0 }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5)

  const topClientes = clientes
    .map(c => {
      const score = scoreClientes.find(s => s.clienteId === c.id)
      return {
        id: c.id,
        nome: c.nome,
        estado: c.estado,
        pedidos: score?.totalPedidos ?? 0,
        scoring: score?.scoring ?? 0,
        risco: score?.riscoChurn ?? "medio",
        ultimo: score?.ultimoPedido ?? "",
      }
    })
    .sort((a, b) => b.scoring - a.scoring)
    .slice(0, 5)

  const riscoTipo = (r: string) => r === "alto" ? "erro" : r === "medio" ? "aviso" : "sucesso"

  const colunas = [
    { rotulo: "Aluno", chave: "nome" },
    { rotulo: "Estado", chave: "estado" },
    { rotulo: "Pedidos", chave: "pedidos", alinhamento: "centro" as const },
    {
      rotulo: "Scoring",
      chave: "scoring",
      alinhamento: "centro" as const,
      renderizar: (v: unknown) => (
        <span className="font-mono font-bold text-[#f97316]">{String(v)}</span>
      ),
    },
    {
      rotulo: "Churn",
      chave: "risco",
      renderizar: (v: unknown) => (
        <Badge tipo={riscoTipo(String(v)) as "sucesso" | "erro" | "aviso"}>{String(v)}</Badge>
      ),
    },
    {
      rotulo: "Último Pedido",
      chave: "ultimo",
      renderizar: (v: unknown) => <span className="text-[#666666]">{formatarData(String(v))}</span>,
    },
  ]

  const pedidosRecentes = pedidos
    .slice()
    .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
    .slice(0, 5)
    .map(p => {
      const cliente = clientes.find(c => c.id === p.clienteId)
      return {
        id: `#${String(p.id).padStart(4, "0")}`,
        aluno: cliente?.nome ?? "-",
        total: formatarReais(p.total),
        data: formatarData(p.criadoEm),
      }
    })

  const colunasRecentes = [
    { rotulo: "#", chave: "id", renderizar: (v: unknown) => <span className="font-mono text-[#4d4d4d]">{String(v)}</span> },
    { rotulo: "Aluno", chave: "aluno" },
    { rotulo: "Total", chave: "total", alinhamento: "direita" as const },
    { rotulo: "Data", chave: "data", alinhamento: "direita" as const, renderizar: (v: unknown) => <span className="text-[#666666]">{String(v)}</span> },
  ]

  return (
    <div className="p-8 animar-entrada">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="font-display text-5xl text-white tracking-wide">DASHBOARD</h1>
        <span className="text-[#4d4d4d] text-sm">
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <CardStat rotulo="Total de Alunos"  valor={String(clientes.length)} descricao="cadastrados" />
        <CardStat rotulo="Receita Total"    valor={formatarReais(receitaTotal)} descricao="todos os pedidos" />
        <CardStat rotulo="Ticket Médio"     valor={formatarReais(ticketMedio)} descricao="por aluno" />
        <CardStat rotulo="Taxa de Churn"    valor={`${taxaChurn}%`} descricao={`${altosRisco} alunos em risco alto`} destaque />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
          <h2 className="font-display text-xl text-white tracking-wide mb-6">VENDAS POR MÊS</h2>
          <GraficoBarras dados={vendasPorMes} formatarValor={formatarReais} />
        </div>
        <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
          <h2 className="font-display text-xl text-white tracking-wide mb-6">TOP PRODUTOS</h2>
          <BarrasHorizontais dados={topProdutos} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
          <h2 className="font-display text-xl text-white tracking-wide mb-6">VENDAS POR CIDADE</h2>
          <BarrasHorizontais dados={vendasCidade} formatarValor={formatarReais} />
        </div>
        <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
          <h2 className="font-display text-xl text-white tracking-wide mb-6">RECEITA POR PRODUTO</h2>
          <BarrasHorizontais dados={receitaPorProduto} formatarValor={formatarReais} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] border border-white/[0.08]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-display text-xl text-white tracking-wide">TOP ALUNOS</h2>
            <Link href="/clientes" className="text-[10px] tracking-widest text-[#f97316] hover:text-[#ea6a0a] uppercase transition-colors">
              Ver todos
            </Link>
          </div>
          <TabelaDados colunas={colunas} dados={topClientes as unknown as Record<string, unknown>[]} />
        </div>

        <div className="bg-[#1a1a1a] border border-white/[0.08]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-display text-xl text-white tracking-wide">PEDIDOS RECENTES</h2>
            <Link href="/pedidos" className="text-[10px] tracking-widest text-[#f97316] hover:text-[#ea6a0a] uppercase transition-colors">
              Ver todos
            </Link>
          </div>
          <TabelaDados colunas={colunasRecentes} dados={pedidosRecentes as unknown as Record<string, unknown>[]} />
        </div>
      </div>
    </div>
  )
}
