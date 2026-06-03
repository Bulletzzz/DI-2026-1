import { requisicao } from "./api"
import type {
  ResumoDashboard,
  VendaMes,
  VendaLocal,
  ReceitaProduto,
  TopCliente,
  TopProduto,
  PedidoRecente,
  ProjecaoReceita,
} from "@/app/tipos"

export const resumoDashboard = () => requisicao<ResumoDashboard>("/dashboard/resumo")

export const vendasPorMes = () => requisicao<VendaMes[]>("/relatorios/vendas-por-mes")

export const vendasPorCidade = () => requisicao<VendaLocal[]>("/relatorios/vendas-por-cidade")

export const receitaPorProduto = () => requisicao<ReceitaProduto[]>("/relatorios/receita-por-produto")

export const topClientes = (limite = 5) =>
  requisicao<TopCliente[]>(`/relatorios/top-clientes?limite=${limite}`)

export const topProdutos = (limite = 5) =>
  requisicao<TopProduto[]>(`/relatorios/top-produtos?limite=${limite}`)

export const pedidosRecentes = (limite = 5) =>
  requisicao<PedidoRecente[]>(`/relatorios/pedidos-recentes?limite=${limite}`)

export const projecaoReceita = () => requisicao<ProjecaoReceita>("/relatorios/projecao-receita")
