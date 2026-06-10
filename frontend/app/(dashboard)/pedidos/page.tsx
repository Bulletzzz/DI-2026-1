"use client"

import { useState } from "react"
import { listarPedidos, criarPedido } from "@/app/servicos/pedidos"
import { listarClientes } from "@/app/servicos/clientes"
import { listarProdutos } from "@/app/servicos/produtos"
import { useCarregar } from "@/app/ganchos/useCarregar"
import { usePaginacao } from "@/app/ganchos/usePaginacao"
import { formatarReais, formatarData } from "@/app/utilitarios/formato"
import type { Pedido, Cliente, Produto } from "@/app/tipos"
import TabelaDados from "@/app/components/organismos/TabelaDados"
import Paginacao from "@/app/components/celulas/Paginacao"
import Modal from "@/app/components/organismos/Modal"
import Botao from "@/app/components/atomos/Botao"
import Select from "@/app/components/atomos/Select"
import CampoTexto from "@/app/components/atomos/CampoTexto"
import EstadoConteudo from "@/app/components/celulas/EstadoConteudo"

interface ItemForm {
  produtoId: number
  quantidade: number
}

interface FormPedido {
  clienteId: number
  itens: ItemForm[]
}

export default function PaginaPedidos() {
  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    const [pedidos, clientes, produtos] = await Promise.all([listarPedidos(), listarClientes(), listarProdutos()])
    return { pedidos, clientes, produtos }
  })

  const lista: Pedido[] = dados?.pedidos ?? []
  const clientes: Cliente[] = dados?.clientes ?? []
  const produtos: Produto[] = dados?.produtos ?? []

  const [modalAberto, setModalAberto] = useState(false)
  const [busca, setBusca] = useState("")
  const [filtroProduto, setFiltroProduto] = useState("todos")
  const [form, setForm] = useState<FormPedido>({ clienteId: 0, itens: [] })
  const [erroSalvar, setErroSalvar] = useState("")
  const [salvando, setSalvando] = useState(false)

  const nomeCliente = (id: number) => clientes.find(c => c.id === id)?.nome ?? ""

  const filtrados = lista.filter(p =>
    nomeCliente(p.clienteId).toLowerCase().includes(busca.toLowerCase()) &&
    (filtroProduto === "todos" || p.itens.some(i => String(i.produtoId) === filtroProduto))
  )

  const pag = usePaginacao(filtrados, 20, busca + filtroProduto)

  function abrirModal() {
    if (clientes.length === 0 || produtos.length === 0) return
    setForm({ clienteId: clientes[0].id, itens: [{ produtoId: produtos[0].id, quantidade: 1 }] })
    setErroSalvar("")
    setModalAberto(true)
  }

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

  async function salvar() {
    if (form.itens.length === 0) { setErroSalvar("Adicione pelo menos um item"); return }
    setSalvando(true)
    setErroSalvar("")
    try {
      await criarPedido({ clienteId: form.clienteId, itens: form.itens })
      setModalAberto(false)
      recarregar()
    } catch (e) {
      setErroSalvar((e as Error).message)
    } finally {
      setSalvando(false)
    }
  }

  const totalForm = form.itens.reduce((acc, item) => {
    const produto = produtos.find(p => p.id === item.produtoId)
    return acc + (produto?.preco ?? 0) * item.quantidade
  }, 0)

  const opcoesFiltroProduto = [
    { valor: "todos", rotulo: "Todos os produtos" },
    ...produtos.map(p => ({ valor: String(p.id), rotulo: p.nome })),
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
        const itens = v as ItemForm[]
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
        <Botao onClick={abrirModal}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Novo Pedido
        </Botao>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4d4d]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome do aluno..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full h-11 pl-9 pr-4 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-[#4d4d4d] outline-none focus:border-[#f97316] transition-colors"
          />
        </div>
        <div className="w-full sm:w-64">
          <Select opcoes={opcoesFiltroProduto} value={filtroProduto} onChange={e => setFiltroProduto(e.target.value)} />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/[0.08]">
        <EstadoConteudo carregando={carregando} erro={erro} aoTentar={recarregar}>
          <TabelaDados colunas={colunas} dados={pag.visiveis as unknown as Record<string, unknown>[]} semDados="Nenhum pedido encontrado" />
          <Paginacao pagina={pag.pagina} totalPaginas={pag.totalPaginas} total={pag.total} inicio={pag.inicio} quantidade={pag.visiveis.length} aoIr={pag.irPara} />
        </EstadoConteudo>
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

          {erroSalvar && <p className="text-[#ef4444] text-xs">{erroSalvar}</p>}

          <div className="flex justify-end gap-3">
            <Botao variante="fantasma" onClick={() => setModalAberto(false)}>Cancelar</Botao>
            <Botao onClick={salvar} carregando={salvando}>Confirmar Pedido</Botao>
          </div>
        </div>
      </Modal>
    </div>
  )
}
