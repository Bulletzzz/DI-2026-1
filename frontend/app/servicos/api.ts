const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

export async function requisicao<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("beast_token") : null

  const resposta = await fetch(`${BASE}${caminho}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opcoes?.headers ?? {}),
    },
    ...opcoes,
  })

  if (resposta.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("beast_token")
      document.cookie = "beast_token=; Max-Age=0; path=/"
      window.location.href = "/login"
    }
    throw new Error("Não autenticado")
  }

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null)
    const mensagem = corpo?.message
    throw new Error(Array.isArray(mensagem) ? mensagem.join(", ") : mensagem ?? `Erro ${resposta.status}`)
  }

  if (resposta.status === 204) return undefined as T
  return resposta.json()
}
