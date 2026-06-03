const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

export async function requisicao<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  const resposta = await fetch(`${BASE}${caminho}`, {
    headers: { "Content-Type": "application/json", ...(opcoes?.headers ?? {}) },
    ...opcoes,
  })

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null)
    const mensagem = corpo?.message
    throw new Error(Array.isArray(mensagem) ? mensagem.join(", ") : mensagem ?? `Erro ${resposta.status}`)
  }

  if (resposta.status === 204) return undefined as T
  return resposta.json()
}
