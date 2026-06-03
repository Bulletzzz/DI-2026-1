import { requisicao } from "./api"
import type { Categoria, NovaCategoria } from "@/app/tipos"

export const listarCategorias = () => requisicao<Categoria[]>("/categorias")

export const buscarCategoria = (id: number) => requisicao<Categoria>(`/categorias/${id}`)

export const criarCategoria = (dados: NovaCategoria) =>
  requisicao<Categoria>("/categorias", { method: "POST", body: JSON.stringify(dados) })

export const atualizarCategoria = (id: number, dados: NovaCategoria) =>
  requisicao<Categoria>(`/categorias/${id}`, { method: "PUT", body: JSON.stringify(dados) })

export const removerCategoria = (id: number) =>
  requisicao<void>(`/categorias/${id}`, { method: "DELETE" })
