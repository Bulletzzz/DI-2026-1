import { requisicao } from "./api"
import type { Produto, NovoProduto } from "@/app/tipos"

export const listarProdutos = () => requisicao<Produto[]>("/produtos")

export const buscarProduto = (id: number) => requisicao<Produto>(`/produtos/${id}`)

export const criarProduto = (dados: NovoProduto) =>
  requisicao<Produto>("/produtos", { method: "POST", body: JSON.stringify(dados) })

export const atualizarProduto = (id: number, dados: NovoProduto) =>
  requisicao<Produto>(`/produtos/${id}`, { method: "PUT", body: JSON.stringify(dados) })

export const removerProduto = (id: number) =>
  requisicao<void>(`/produtos/${id}`, { method: "DELETE" })
