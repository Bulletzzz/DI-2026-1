"use client"

import Link from "next/link"
import {
  resumoDashboard,
  vendasPorMes,
  vendasPorCidade,
  receitaPorProduto,
  topClientes,
  topProdutos,
  pedidosRecentes,
} from "@/app/servicos/analitica"
import { useCarregar } from "@/app/ganchos/useCarregar"
import { formatarReais, formatarData } from "@/app/utilitarios/formato"
import CardStat from "@/app/components/celulas/CardStat"
import GraficoBarras from "@/app/components/celulas/GraficoBarras"
import BarrasHorizontais from "@/app/components/celulas/BarrasHorizontais"
import TabelaDados from "@/app/components/organismos/TabelaDados"
import Badge from "@/app/components/atomos/Badge"
import EstadoConteudo from "@/app/components/celulas/EstadoConteudo"

export default function PaginaDashboard() {
  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    const [resumo, meses, cidades, receitaProd, clientes, produtos, recentes] = await Promise.all([
      resumoDashboard(),
      vendasPorMes(),
      vendasPorCidade(),
      receitaPorProduto(),
      topClientes(5),
      topProdutos(5),
      pedidosRecentes(5),
    ])
    return { resumo, meses, cidades, receitaProd, clientes, produtos, recentes }
  })

  const riscoTipo = (r: string) => r === "alto" ? "erro" : r === "medio" ? "aviso" : "sucesso"

  const colunas = [
    { rotulo: "Aluno", chave: "nome" },
    { rotulo: "Estado", chave: "estado" },
    { rotulo: "Pedidos", chave: "totalPedidos", alinhamento: "centro" as const },
    {
      rotulo: "Scoring",
      chave: "scoring",
      alinhamento: "centro" as const,
      renderizar: (v: unknown) => <span className="font-mono font-bold text-[#f97316]">{String(v)}</span>,
    },
    {
      rotulo: "Churn",
      chave: "riscoChurn",
      renderizar: (v: unknown) => <Badge tipo={riscoTipo(String(v)) as "sucesso" | "erro" | "aviso"}>{String(v)}</Badge>,
    },
    {
      rotulo: "Último Pedido",
      chave: "ultimoPedido",
      renderizar: (v: unknown) => <span className="text-[#666666]">{formatarData(String(v))}</span>,
    },
  ]

  const colunasRecentes = [
    { rotulo: "#", chave: "id", renderizar: (v: unknown) => <span className="font-mono text-[#4d4d4d]">{`#${String(v).padStart(4, "0")}`}</span> },
    { rotulo: "Aluno", chave: "clienteNome" },
    { rotulo: "Total", chave: "total", alinhamento: "direita" as const, renderizar: (v: unknown) => formatarReais(Number(v)) },
    { rotulo: "Data", chave: "criadoEm", alinhamento: "direita" as const, renderizar: (v: unknown) => <span className="text-[#666666]">{formatarData(String(v))}</span> },
  ]

  return (
    <div className="p-8 animar-entrada">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="font-display text-5xl text-white tracking-wide">DASHBOARD</h1>
        <span className="text-[#4d4d4d] text-sm">
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      <EstadoConteudo carregando={carregando} erro={erro} aoTentar={recarregar}>
        {dados && (
          <>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <CardStat rotulo="Total de Alunos" valor={String(dados.resumo.totalClientes)} descricao="cadastrados" />
              <CardStat rotulo="Receita Total" valor={formatarReais(dados.resumo.receitaTotal)} descricao="todos os pedidos" />
              <CardStat rotulo="Ticket Médio" valor={formatarReais(dados.resumo.ticketMedio)} descricao="por aluno" />
              <CardStat rotulo="Taxa de Churn" valor={`${dados.resumo.taxaChurn.toFixed(2)}%`} descricao={`${dados.resumo.clientesRiscoAlto} alunos em risco alto`} destaque />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
                <h2 className="font-display text-xl text-white tracking-wide mb-6">VENDAS POR MÊS</h2>
                <GraficoBarras dados={dados.meses.map(v => ({ rotulo: v.mes, valor: v.total }))} formatarValor={formatarReais} />
              </div>
              <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
                <h2 className="font-display text-xl text-white tracking-wide mb-6">TOP PRODUTOS</h2>
                <BarrasHorizontais dados={dados.produtos.map(p => ({ rotulo: p.nome, valor: p.quantidade }))} />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
                <h2 className="font-display text-xl text-white tracking-wide mb-6">VENDAS POR CIDADE</h2>
                <BarrasHorizontais dados={dados.cidades.map(v => ({ rotulo: v.rotulo, valor: v.total }))} formatarValor={formatarReais} />
              </div>
              <div className="bg-[#1a1a1a] border border-white/[0.08] p-6">
                <h2 className="font-display text-xl text-white tracking-wide mb-6">RECEITA POR PRODUTO</h2>
                <BarrasHorizontais dados={dados.receitaProd.map(p => ({ rotulo: p.nome, valor: p.receita }))} formatarValor={formatarReais} />
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
                <TabelaDados colunas={colunas} dados={dados.clientes as unknown as Record<string, unknown>[]} />
              </div>

              <div className="bg-[#1a1a1a] border border-white/[0.08]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                  <h2 className="font-display text-xl text-white tracking-wide">PEDIDOS RECENTES</h2>
                  <Link href="/pedidos" className="text-[10px] tracking-widest text-[#f97316] hover:text-[#ea6a0a] uppercase transition-colors">
                    Ver todos
                  </Link>
                </div>
                <TabelaDados colunas={colunasRecentes} dados={dados.recentes as unknown as Record<string, unknown>[]} />
              </div>
            </div>
          </>
        )}
      </EstadoConteudo>
    </div>
  )
}
