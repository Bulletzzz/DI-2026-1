import { requisicao } from "./api"
import type { Pedido, NovoPedido } from "@/app/tipos"

export const listarPedidos = () => requisicao<Pedido[]>("/pedidos")

export const buscarPedido = (id: number) => requisicao<Pedido>(`/pedidos/${id}`)

export const criarPedido = (dados: NovoPedido) =>
  requisicao<Pedido>("/pedidos", { method: "POST", body: JSON.stringify(dados) })

export const removerPedido = (id: number) =>
  requisicao<void>(`/pedidos/${id}`, { method: "DELETE" })
