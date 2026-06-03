import { requisicao } from "./api"
import type { Cliente, NovoCliente } from "@/app/tipos"

export const listarClientes = () => requisicao<Cliente[]>("/clientes")

export const buscarCliente = (id: number) => requisicao<Cliente>(`/clientes/${id}`)

export const criarCliente = (dados: NovoCliente) =>
  requisicao<Cliente>("/clientes", { method: "POST", body: JSON.stringify(dados) })

export const atualizarCliente = (id: number, dados: NovoCliente) =>
  requisicao<Cliente>(`/clientes/${id}`, { method: "PUT", body: JSON.stringify(dados) })

export const removerCliente = (id: number) =>
  requisicao<void>(`/clientes/${id}`, { method: "DELETE" })
