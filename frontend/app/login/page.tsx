"use client"

import { useState } from "react"
import Botao from "../components/atomos/Botao"
import CampoTexto from "../components/atomos/CampoTexto"

export default function PaginaLogin() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [erros, setErros] = useState<{ email?: string; senha?: string }>({})

  function validar() {
    const novosErros: typeof erros = {}
    if (!email) novosErros.email = "Campo obrigatório"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novosErros.email = "E-mail inválido"
    if (!senha) novosErros.senha = "Campo obrigatório"
    else if (senha.length < 6) novosErros.senha = "Mínimo 6 caracteres"
    return novosErros
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }
    setErros({})
    setCarregando(true)
    await new Promise(r => setTimeout(r, 1200))
    setCarregando(false)
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex">
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center border-r border-white/[0.06] p-12 gap-8">
        <img src="/LogoMarca.svg" alt="BEAST" className="w-80 select-none" draggable={false} />
        <div className="text-center">
          <p className="text-[#f97316] text-xl font-mono tracking-widest font-bold">B.E.A.S.T</p>
          <p className="text-[#666666] text-sm tracking-wide mt-2">Bernardo's Enterprise Analytics & Sales Tracker</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col gap-8 animar-entrada">
          <div className="flex flex-col gap-1 lg:hidden items-center mb-4">
            <img src="/LogoMarca.svg" alt="BEAST" className="w-40 select-none" draggable={false} />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-display text-4xl text-white tracking-wide">ENTRAR</h1>
            <p className="text-[#4d4d4d] text-sm">Acesse o painel de controle</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <CampoTexto
              rotulo="E-mail"
              type="email"
              placeholder="bernardo@beast.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErros(p => ({ ...p, email: undefined })) }}
              erro={erros.email}
              autoComplete="email"
            />
            <CampoTexto
              rotulo="Senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => { setSenha(e.target.value); setErros(p => ({ ...p, senha: undefined })) }}
              erro={erros.senha}
              autoComplete="current-password"
            />

            <Botao type="submit" carregando={carregando} className="w-full mt-2">
              Entrar
            </Botao>
          </form>

          <div className="border-t border-white/[0.06] pt-6">
            <p className="text-[#4d4d4d] text-xs text-center tracking-wide">
              BEAST &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
