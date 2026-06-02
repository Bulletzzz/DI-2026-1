"use client"

import { useState } from "react"
import { pedidos as dadosIniciais, clientes, produtos, formatarReais, formatarData, type Pedido } from "@/app/dados/mock"
import TabelaDados from "@/app/components/organismos/TabelaDados"
import Modal from "@/app/components/organismos/Modal"
import Botao from "@/app/components/atomos/Botao"
import Select from "@/app/components/atomos/Select"
import CampoTexto from "@/app/components/atomos/CampoTexto"

interface ItemForm {
  produtoId: number
  quantidade: number
}

interface FormPedido {
  clienteId: number
  itens: ItemForm[]
}

export default function PaginaPedidos() {
  const [lista, setLista] = useState<Pedido[]>(dadosIniciais)
  const [modalAberto, setModalAberto] = useState(false)
  const [filtroCliente, setFiltroCliente] = useState("todos")
  const [form, setForm] = useState<FormPedido>({ clienteId: clientes[0].id, itens: [{ produtoId: produtos[0].id, quantidade: 1 }] })
  const [proximo, setProximo] = useState(lista.length + 1)

  const filtrados = lista.filter(p =>
    filtroCliente === "todos" || String(p.clienteId) === filtroCliente
  )

  function adicionarItem() {
    setForm(prev => ({ ...prev, itens: [...prev.itens, { produtoId: produtos[0].id, quantidade: 1 }] }))
  }

  function removerItem(idx: number) {
    setForm(prev => ({ ...prev, itens: prev.itens.filter((_, i) => i !== idx) }))
  }

  function atualizarItem(idx: number, campo: keyof ItemForm, valor: number) {
    setForm(prev => ({
      ...prev,
      itens: prev.itens.map((item, i) => i === idx ? { ...item, [campo]: valor } : item),
    }))
  }

  function salvar() {
    const total = form.itens.reduce((acc, item) => {
      const produto = produtos.find(p => p.id === item.produtoId)
      return acc + (produto?.preco ?? 0) * item.quantidade
    }, 0)
    setLista(prev => [...prev, {
      id: proximo,
      clienteId: form.clienteId,
      itens: form.itens,
      total,
      criadoEm: new Date().toISOString().split("T")[0],
    }])
    setProximo(n => n + 1)
    setModalAberto(false)
    setForm({ clienteId: clientes[0].id, itens: [{ produtoId: produtos[0].id, quantidade: 1 }] })
  }

  const totalForm = form.itens.reduce((acc, item) => {
    const produto = produtos.find(p => p.id === item.produtoId)
    return acc + (produto?.preco ?? 0) * item.quantidade
  }, 0)

  const opcoesFiltro = [
    { valor: "todos", rotulo: "Todos os alunos" },
    ...clientes.map(c => ({ valor: String(c.id), rotulo: c.nome })),
  ]

  const opcoesClientes = clientes.map(c => ({ valor: c.id, rotulo: c.nome }))
  const opcoesProdutos = produtos.map(p => ({ valor: p.id, rotulo: `${p.nome} — ${formatarReais(p.preco)}` }))

  const colunas = [
    { rotulo: "#", chave: "id", renderizar: (v: unknown) => <span className="font-mono text-[#4d4d4d]">{`#${String(v).padStart(4, "0")}`}</span> },
    {
      rotulo: "Aluno",
      chave: "clienteId",
      renderizar: (v: unknown) => {
        const c = clientes.find(c => c.id === Number(v))
        return <span className="text-white">{c?.nome ?? "-"}</span>
      },
    },
    {
      rotulo: "Itens",
      chave: "itens",
      renderizar: (v: unknown) => {
        const itens = v as { produtoId: number; quantidade: number }[]
        const nomes = itens.map(i => {
          const p = produtos.find(pr => pr.id === i.produtoId)
          return `${p?.nome ?? "?"} ×${i.quantidade}`
        }).join(", ")
        return <span className="text-[#808080] text-xs">{nomes}</span>
      },
    },
    {
      rotulo: "Total",
      chave: "total",
      alinhamento: "direita" as const,
      renderizar: (v: unknown) => <span className="font-mono text-[#f97316] font-bold">{formatarReais(Number(v))}</span>,
    },
    {
      rotulo: "Data",
      chave: "criadoEm",
      alinhamento: "direita" as const,
      renderizar: (v: unknown) => <span className="text-[#666666]">{formatarData(String(v))}</span>,
    },
  ]

  return (
    <div className="p-8 animar-entrada">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-5xl text-white tracking-wide">PEDIDOS</h1>
          <p className="text-[#4d4d4d] text-sm mt-1">{lista.length} pedidos registrados</p>
        </div>
        <Botao onClick={() => setModalAberto(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Novo Pedido
        </Botao>
      </div>

      <div className="mb-4 w-64">
        <Select opcoes={opcoesFiltro} value={filtroCliente} onChange={e => setFiltroCliente(e.target.value)} />
      </div>

      <div className="bg-[#1a1a1a] border border-white/[0.08]">
        <TabelaDados colunas={colunas} dados={filtrados as unknown as Record<string, unknown>[]} semDados="Nenhum pedido encontrado" />
      </div>

      <Modal aberto={modalAberto} onFechar={() => setModalAberto(false)} titulo="Novo Pedido" largura="max-w-xl">
        <div className="flex flex-col gap-5">
          <Select
            rotulo="Aluno"
            opcoes={opcoesClientes}
            value={form.clienteId}
            onChange={e => setForm(p => ({ ...p, clienteId: Number(e.target.value) }))}
          />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest text-[#808080] uppercase">Itens</span>
              <button onClick={adicionarItem} className="text-[10px] text-[#f97316] tracking-widest uppercase hover:underline">
                + Adicionar item
              </button>
            </div>

            {form.itens.map((item, idx) => (
              <div key={idx} className="flex items-end gap-3">
                <div className="flex-1">
                  <Select
                    opcoes={opcoesProdutos}
                    value={item.produtoId}
                    onChange={e => atualizarItem(idx, "produtoId", Number(e.target.value))}
                  />
                </div>
                <div className="w-20">
                  <CampoTexto
                    rotulo="Qtd."
                    type="number"
                    min="1"
                    value={String(item.quantidade)}
                    onChange={e => atualizarItem(idx, "quantidade", Math.max(1, Number(e.target.value)))}
                  />
                </div>
                {form.itens.length > 1 && (
                  <button onClick={() => removerItem(idx)} className="text-[#666666] hover:text-[#ef4444] transition-colors p-2 mb-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="text-[#4d4d4d] text-sm">Total</span>
            <span className="font-display text-2xl text-[#f97316]">{formatarReais(totalForm)}</span>
          </div>

          <div className="flex justify-end gap-3">
            <Botao variante="fantasma" onClick={() => setModalAberto(false)}>Cancelar</Botao>
            <Botao onClick={salvar}>Confirmar Pedido</Botao>
          </div>
        </div>
      </Modal>
    </div>
  )
}
