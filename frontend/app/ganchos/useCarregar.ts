"use client"

import { useEffect, useRef, useState } from "react"

export function useCarregar<T>(buscar: () => Promise<T>, deps: unknown[] = []) {
  const [dados, setDados] = useState<T | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [gatilho, setGatilho] = useState(0)
  const refBuscar = useRef(buscar)
  refBuscar.current = buscar

  const chave = JSON.stringify(deps)

  useEffect(() => {
    let ativo = true
    setCarregando(true)
    setErro(null)
    refBuscar.current()
      .then(d => { if (ativo) setDados(d) })
      .catch((e: Error) => { if (ativo) setErro(e.message) })
      .finally(() => { if (ativo) setCarregando(false) })
    return () => { ativo = false }
  }, [gatilho, chave])

  return { dados, carregando, erro, recarregar: () => setGatilho(g => g + 1) }
}
