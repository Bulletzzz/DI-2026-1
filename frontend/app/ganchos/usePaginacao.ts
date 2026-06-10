"use client"

import { useEffect, useState } from "react"

export function usePaginacao<T>(itens: T[], porPagina = 20, chaveReset?: unknown) {
  const [pagina, setPagina] = useState(1)

  useEffect(() => { setPagina(1) }, [chaveReset])

  const totalPaginas = Math.max(1, Math.ceil(itens.length / porPagina))
  const atual = Math.min(pagina, totalPaginas)
  const inicio = (atual - 1) * porPagina
  const visiveis = itens.slice(inicio, inicio + porPagina)

  return {
    pagina: atual,
    totalPaginas,
    visiveis,
    inicio,
    total: itens.length,
    irPara: (p: number) => setPagina(Math.min(Math.max(1, p), totalPaginas)),
  }
}
