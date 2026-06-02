"use client"

import { useState } from "react"
import { produtos as dadosIniciais, categorias, formatarReais, type Produto } from "@/app/dados/mock"
import TabelaDados from "@/app/components/organismos/TabelaDados"
import Modal from "@/app/components/organismos/Modal"
import Badge from "@/app/components/atomos/Badge"
import Botao from "@/app/components/atomos/Botao"
import CampoTexto from "@/app/components/atomos/CampoTexto"
import Select from "@/app/components/atomos/Select"

interface FormProduto {
  nome: string
  preco: string
  estoque: string
  categoriaId: string
}

const formVazio: FormProduto = { nome: "", preco: "", estoque: "", categoriaId: "1" }

export default function PaginaProdutos() {
  const [lista, setLista] = useState<Produto[]>(dadosIniciais)
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<Produto | null>(null)
  const [form, setForm] = useState<FormProduto>(formVazio)
  const [erros, setErros] = useState<Partial<FormProduto>>({})
  const [deletando, setDeletando] = useState<number | null>(null)
  const [proximo, setProximo] = useState(lista.length + 1)

  const filtrados = lista.filter(p =>
    filtroCategoria === "todos" || String(p.categoriaId) === filtroCategoria
  )

  function abrirCriar() {
    setEditando(null)
    setForm(formVazio)
    setErros({})
    setModalAberto(true)
  }

  function abrirEditar(p: Produto) {
    setEditando(p)
    setForm({ nome: p.nome, preco: String(p.preco), estoque: String(p.estoque), categoriaId: String(p.categoriaId ?? "") })
    setErros({})
    setModalAberto(true)
  }

  function validar() {
    const e: Partial<FormProduto> = {}
    if (!form.nome.trim()) e.nome = "Obrigatório"
    if (!form.preco || isNaN(Number(form.preco)) || Number(form.preco) <= 0) e.preco = "Preço deve ser positivo"
    if (!form.estoque || isNaN(Number(form.estoque)) || Number(form.estoque) < 0) e.estoque = "Estoque não pode ser negativo"
    return e
  }

  function salvar() {
    const e = validar()
    if (Object.keys(e).length > 0) { setErros(e); return }
    const dados = {
      nome: form.nome,
      preco: Number(form.preco),
      estoque: Number(form.estoque),
      categoriaId: form.categoriaId ? Number(form.categoriaId) : null,
    }
    if (editando) {
      setLista(prev => prev.map(p => p.id === editando.id ? { ...p, ...dados } : p))
    } else {
      setLista(prev => [...prev, { id: proximo, ...dados }])
      setProximo(n => n + 1)
    }
    setModalAberto(false)
  }

  const opcoesCategorias = [
    { valor: "", rotulo: "Sem categoria" },
    ...categorias.map(c => ({ valor: c.id, rotulo: c.nome })),
  ]

  const opcoesFiltroCat = [
    { valor: "todos", rotulo: "Todas as categorias" },
    ...categorias.map(c => ({ valor: String(c.id), rotulo: c.nome })),
  ]

  const colunas = [
    { rotulo: "ID", chave: "id", renderizar: (v: unknown) => <span className="font-mono text-[#4d4d4d]">{String(v)}</span> },
    { rotulo: "Nome", chave: "nome", renderizar: (v: unknown) => <span className="text-white font-medium">{String(v)}</span> },
    {
      rotulo: "Categoria",
      chave: "categoriaId",
      renderizar: (v: unknown) => {
        const cat = categorias.find(c => c.id === Number(v))
        return cat ? <Badge tipo="neutro">{cat.nome}</Badge> : <span className="text-[#4d4d4d] text-xs">—</span>
      },
    },
    {
      rotulo: "Preço",
      chave: "preco",
      alinhamento: "direita" as const,
      renderizar: (v: unknown) => <span className="font-mono text-[#f97316]">{formatarReais(Number(v))}</span>,
    },
    {
      rotulo: "Estoque",
      chave: "estoque",
      alinhamento: "centro" as const,
      renderizar: (v: unknown) => {
        const n = Number(v)
        return <span className={`font-mono ${n <= 20 ? "text-[#ef4444]" : n <= 50 ? "text-[#f59e0b]" : "text-[#22c55e]"}`}>{n === 999 ? "∞" : n}</span>
      },
    },
    {
      rotulo: "Ações",
      chave: "id",
      alinhamento: "direita" as const,
      renderizar: (_: unknown, linha: Record<string, unknown>) => {
        const id = Number(linha.id)
        if (deletando === id) {
          return (
            <div className="flex items-center gap-2 justify-end">
              <button onClick={() => { setLista(p => p.filter(x => x.id !== id)); setDeletando(null) }} className="text-[10px] text-[#ef4444] uppercase tracking-widest hover:underline">Confirmar</button>
              <button onClick={() => setDeletando(null)} className="text-[10px] text-[#666] uppercase tracking-widest hover:underline">Cancelar</button>
            </div>
          )
        }
        return (
          <div className="flex items-center gap-2 justify-end">
            <button onClick={() => abrirEditar(lista.find(p => p.id === id)!)} className="text-[#666666] hover:text-[#f97316] transition-colors p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button onClick={() => setDeletando(id)} className="text-[#666666] hover:text-[#ef4444] transition-colors p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="p-8 animar-entrada">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-5xl text-white tracking-wide">PRODUTOS</h1>
          <p className="text-[#4d4d4d] text-sm mt-1">{lista.length} produtos cadastrados</p>
        </div>
        <Botao onClick={abrirCriar}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Novo Produto
        </Botao>
      </div>

      <div className="mb-4 w-56">
        <Select
          opcoes={opcoesFiltroCat}
          value={filtroCategoria}
          onChange={e => setFiltroCategoria(e.target.value)}
        />
      </div>

      <div className="bg-[#1a1a1a] border border-white/[0.08]">
        <TabelaDados colunas={colunas} dados={filtrados as unknown as Record<string, unknown>[]} semDados="Nenhum produto encontrado" />
      </div>

      <Modal aberto={modalAberto} onFechar={() => setModalAberto(false)} titulo={editando ? "Editar Produto" : "Novo Produto"}>
        <div className="flex flex-col gap-4">
          <CampoTexto
            rotulo="Nome"
            value={form.nome}
            onChange={e => { setForm(p => ({ ...p, nome: e.target.value })); setErros(p => ({ ...p, nome: undefined })) }}
            erro={erros.nome}
          />
          <div className="grid grid-cols-2 gap-3">
            <CampoTexto
              rotulo="Preço (R$)"
              type="number"
              step="0.01"
              min="0"
              value={form.preco}
              onChange={e => { setForm(p => ({ ...p, preco: e.target.value })); setErros(p => ({ ...p, preco: undefined })) }}
              erro={erros.preco}
            />
            <CampoTexto
              rotulo="Estoque"
              type="number"
              min="0"
              value={form.estoque}
              onChange={e => { setForm(p => ({ ...p, estoque: e.target.value })); setErros(p => ({ ...p, estoque: undefined })) }}
              erro={erros.estoque}
            />
          </div>
          <Select
            rotulo="Categoria"
            opcoes={opcoesCategorias}
            value={form.categoriaId}
            onChange={e => setForm(p => ({ ...p, categoriaId: e.target.value }))}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Botao variante="fantasma" onClick={() => setModalAberto(false)}>Cancelar</Botao>
            <Botao onClick={salvar}>Salvar</Botao>
          </div>
        </div>
      </Modal>
    </div>
  )
}
