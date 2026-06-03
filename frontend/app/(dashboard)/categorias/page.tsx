"use client"

import { useState } from "react"
import { listarCategorias, criarCategoria, atualizarCategoria, removerCategoria } from "@/app/servicos/categorias"
import { listarProdutos } from "@/app/servicos/produtos"
import { useCarregar } from "@/app/ganchos/useCarregar"
import type { Categoria, Produto } from "@/app/tipos"
import TabelaDados from "@/app/components/organismos/TabelaDados"
import Modal from "@/app/components/organismos/Modal"
import Botao from "@/app/components/atomos/Botao"
import CampoTexto from "@/app/components/atomos/CampoTexto"
import EstadoConteudo from "@/app/components/celulas/EstadoConteudo"

export default function PaginaCategorias() {
  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    const [categorias, produtos] = await Promise.all([listarCategorias(), listarProdutos()])
    return { categorias, produtos }
  })

  const lista = dados?.categorias ?? []
  const produtos: Produto[] = dados?.produtos ?? []

  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<Categoria | null>(null)
  const [nome, setNome] = useState("")
  const [erroCampo, setErroCampo] = useState("")
  const [erroSalvar, setErroSalvar] = useState("")
  const [deletando, setDeletando] = useState<number | null>(null)
  const [salvando, setSalvando] = useState(false)

  function abrirCriar() {
    setEditando(null)
    setNome("")
    setErroCampo("")
    setErroSalvar("")
    setModalAberto(true)
  }

  function abrirEditar(c: Categoria) {
    setEditando(c)
    setNome(c.nome)
    setErroCampo("")
    setErroSalvar("")
    setModalAberto(true)
  }

  async function salvar() {
    if (!nome.trim()) { setErroCampo("Obrigatório"); return }
    setSalvando(true)
    setErroSalvar("")
    try {
      if (editando) await atualizarCategoria(editando.id, { nome })
      else await criarCategoria({ nome })
      setModalAberto(false)
      recarregar()
    } catch (e) {
      setErroSalvar((e as Error).message)
    } finally {
      setSalvando(false)
    }
  }

  async function deletar(id: number) {
    try {
      await removerCategoria(id)
      setDeletando(null)
      recarregar()
    } catch (e) {
      setErroSalvar((e as Error).message)
      setDeletando(null)
    }
  }

  const totalProdutos = (id: number) => produtos.filter(p => p.categoriaId === id).length

  const colunas = [
    { rotulo: "ID", chave: "id", renderizar: (v: unknown) => <span className="font-mono text-[#4d4d4d]">{String(v)}</span> },
    { rotulo: "Nome", chave: "nome", renderizar: (v: unknown) => <span className="text-white font-medium">{String(v)}</span> },
    {
      rotulo: "Produtos",
      chave: "id",
      alinhamento: "centro" as const,
      renderizar: (v: unknown) => <span className="font-mono text-[#f97316]">{totalProdutos(Number(v))}</span>,
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
              <button onClick={() => deletar(id)} className="text-[10px] text-[#ef4444] uppercase tracking-widest hover:underline">Confirmar</button>
              <button onClick={() => setDeletando(null)} className="text-[10px] text-[#666] uppercase tracking-widest hover:underline">Cancelar</button>
            </div>
          )
        }
        return (
          <div className="flex items-center gap-2 justify-end">
            <button onClick={() => abrirEditar(lista.find(c => c.id === id)!)} className="text-[#666666] hover:text-[#f97316] transition-colors p-1">
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
          <h1 className="font-display text-5xl text-white tracking-wide">CATEGORIAS</h1>
          <p className="text-[#4d4d4d] text-sm mt-1">{lista.length} categorias cadastradas</p>
        </div>
        <Botao onClick={abrirCriar}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nova Categoria
        </Botao>
      </div>

      <div className="bg-[#1a1a1a] border border-white/[0.08]">
        <EstadoConteudo carregando={carregando} erro={erro} aoTentar={recarregar}>
          <TabelaDados colunas={colunas} dados={lista as unknown as Record<string, unknown>[]} semDados="Nenhuma categoria encontrada" />
        </EstadoConteudo>
      </div>

      <Modal aberto={modalAberto} onFechar={() => setModalAberto(false)} titulo={editando ? "Editar Categoria" : "Nova Categoria"}>
        <div className="flex flex-col gap-4">
          <CampoTexto
            rotulo="Nome"
            value={nome}
            onChange={e => { setNome(e.target.value); setErroCampo("") }}
            erro={erroCampo}
            autoFocus
          />
          {erroSalvar && <p className="text-[#ef4444] text-xs">{erroSalvar}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Botao variante="fantasma" onClick={() => setModalAberto(false)}>Cancelar</Botao>
            <Botao onClick={salvar} carregando={salvando}>Salvar</Botao>
          </div>
        </div>
      </Modal>
    </div>
  )
}
