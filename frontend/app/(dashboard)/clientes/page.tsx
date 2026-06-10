"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { listarClientes, criarCliente, atualizarCliente, removerCliente } from "@/app/servicos/clientes"
import { listarScores } from "@/app/servicos/ia"
import { useCarregar } from "@/app/ganchos/useCarregar"
import { usePaginacao } from "@/app/ganchos/usePaginacao"
import type { Cliente, ScoreCliente, NovoCliente } from "@/app/tipos"
import TabelaDados from "@/app/components/organismos/TabelaDados"
import Paginacao from "@/app/components/celulas/Paginacao"
import Modal from "@/app/components/organismos/Modal"
import Badge from "@/app/components/atomos/Badge"
import Botao from "@/app/components/atomos/Botao"
import CampoTexto from "@/app/components/atomos/CampoTexto"
import EstadoConteudo from "@/app/components/celulas/EstadoConteudo"

const formVazio: NovoCliente = { nome: "", email: "", cidade: "", estado: "", pais: "Brasil", temPlano: false }

export default function PaginaClientes() {
  const router = useRouter()
  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    const [clientes, scores] = await Promise.all([listarClientes(), listarScores()])
    return { clientes, scores }
  })

  const lista: Cliente[] = dados?.clientes ?? []
  const scores: ScoreCliente[] = dados?.scores ?? []

  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<Cliente | null>(null)
  const [form, setForm] = useState<NovoCliente>(formVazio)
  const [erros, setErros] = useState<Partial<NovoCliente>>({})
  const [erroSalvar, setErroSalvar] = useState("")
  const [salvando, setSalvando] = useState(false)
  const [deletando, setDeletando] = useState<number | null>(null)

  const filtrados = lista.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.email.toLowerCase().includes(busca.toLowerCase()) ||
    c.cidade.toLowerCase().includes(busca.toLowerCase())
  )

  const pag = usePaginacao(filtrados, 20, busca)

  function abrirCriar() {
    setEditando(null)
    setForm(formVazio)
    setErros({})
    setErroSalvar("")
    setModalAberto(true)
  }

  function abrirEditar(c: Cliente) {
    setEditando(c)
    setForm({ nome: c.nome, email: c.email, cidade: c.cidade, estado: c.estado, pais: c.pais, temPlano: c.temPlano ?? false })
    setErros({})
    setErroSalvar("")
    setModalAberto(true)
  }

  function validar() {
    const e: Partial<NovoCliente> = {}
    if (!form.nome.trim()) e.nome = "Obrigatório"
    if (!form.email.trim()) e.email = "Obrigatório"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido"
    if (!form.cidade.trim()) e.cidade = "Obrigatório"
    if (!form.estado.trim()) e.estado = "Obrigatório"
    if (!form.pais.trim()) e.pais = "Obrigatório"
    return e
  }

  async function salvar() {
    const e = validar()
    if (Object.keys(e).length > 0) { setErros(e); return }
    setSalvando(true)
    setErroSalvar("")
    try {
      if (editando) await atualizarCliente(editando.id, form)
      else await criarCliente(form)
      setModalAberto(false)
      recarregar()
    } catch (err) {
      setErroSalvar((err as Error).message)
    } finally {
      setSalvando(false)
    }
  }

  async function deletar(id: number) {
    try {
      await removerCliente(id)
      setDeletando(null)
      recarregar()
    } catch {
      setDeletando(null)
    }
  }

  const campo = (chave: keyof NovoCliente, rotulo: string, tipo = "text") => (
    <CampoTexto
      rotulo={rotulo}
      type={tipo}
      value={String(form[chave] ?? "")}
      onChange={e => { setForm(p => ({ ...p, [chave]: e.target.value })); setErros(p => ({ ...p, [chave]: undefined })) }}
      erro={erros[chave] as string | undefined}
    />
  )

  const riscoTipo = (r: string) => r === "alto" ? "erro" : r === "medio" ? "aviso" : "sucesso"

  const colunas = [
    { rotulo: "ID", chave: "id", renderizar: (v: unknown) => <span className="font-mono text-[#4d4d4d]">{String(v)}</span> },
    { rotulo: "Nome", chave: "nome", renderizar: (v: unknown) => <span className="text-white font-medium">{String(v)}</span> },
    { rotulo: "E-mail", chave: "email", renderizar: (v: unknown) => <span className="text-[#808080]">{String(v)}</span> },
    { rotulo: "Cidade", chave: "cidade" },
    { rotulo: "Estado", chave: "estado" },
    {
      rotulo: "Churn",
      chave: "id",
      renderizar: (v: unknown) => {
        const s = scores.find(s => s.clienteId === Number(v))
        return s ? <Badge tipo={riscoTipo(s.riscoChurn) as "sucesso" | "erro" | "aviso"}>{s.riscoChurn}</Badge> : <Badge>-</Badge>
      },
    },
    {
      rotulo: "Scoring",
      chave: "id",
      alinhamento: "centro" as const,
      renderizar: (v: unknown) => {
        const s = scores.find(s => s.clienteId === Number(v))
        return <span className="font-mono font-bold text-[#f97316]">{s?.scoring ?? "-"}</span>
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
              <button onClick={(e) => { e.stopPropagation(); deletar(id) }} className="text-[10px] text-[#ef4444] uppercase tracking-widest hover:underline">Confirmar</button>
              <button onClick={(e) => { e.stopPropagation(); setDeletando(null) }} className="text-[10px] text-[#666] uppercase tracking-widest hover:underline">Cancelar</button>
            </div>
          )
        }
        return (
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={(e) => { e.stopPropagation(); abrirEditar(lista.find(c => c.id === id)!) }}
              className="text-[#666666] hover:text-[#f97316] transition-colors p-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setDeletando(id) }} className="text-[#666666] hover:text-[#ef4444] transition-colors p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
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
          <h1 className="font-display text-5xl text-white tracking-wide">CLIENTES</h1>
          <p className="text-[#4d4d4d] text-sm mt-1">{lista.length} alunos cadastrados</p>
        </div>
        <Botao onClick={abrirCriar}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Novo Aluno
        </Botao>
      </div>

      <div className="mb-4">
        <div className="relative w-80 max-w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4d4d4d]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou cidade..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-[#1a1a1a] border border-white/10 text-sm text-white placeholder:text-[#4d4d4d] outline-none focus:border-[#f97316] transition-colors"
          />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/[0.08]">
        <EstadoConteudo carregando={carregando} erro={erro} aoTentar={recarregar}>
          <TabelaDados
            colunas={colunas}
            dados={pag.visiveis as unknown as Record<string, unknown>[]}
            aoClicarLinha={l => router.push(`/clientes/${l.id}`)}
            semDados="Nenhum aluno encontrado"
          />
          <Paginacao pagina={pag.pagina} totalPaginas={pag.totalPaginas} total={pag.total} inicio={pag.inicio} quantidade={pag.visiveis.length} aoIr={pag.irPara} />
        </EstadoConteudo>
      </div>

      <Modal aberto={modalAberto} onFechar={() => setModalAberto(false)} titulo={editando ? "Editar Aluno" : "Novo Aluno"}>
        <div className="flex flex-col gap-4">
          {campo("nome", "Nome")}
          {campo("email", "E-mail", "email")}
          <div className="grid grid-cols-2 gap-3">
            {campo("cidade", "Cidade")}
            {campo("estado", "Estado")}
          </div>
          {campo("pais", "País")}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.temPlano}
              onChange={e => setForm(p => ({ ...p, temPlano: e.target.checked }))}
              className="w-4 h-4 accent-[#f97316]"
            />
            <span className="text-sm text-[#808080]">Tem plano ativo</span>
          </label>
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
