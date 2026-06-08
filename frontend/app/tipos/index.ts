export type RiscoChurn = "alto" | "medio" | "baixo"

export interface Cliente {
  id: number
  nome: string
  email: string
  cidade: string
  estado: string
  pais: string
  temPlano: boolean
  criadoEm: string
}

export interface Categoria {
  id: number
  nome: string
}

export interface Produto {
  id: number
  nome: string
  preco: number
  estoque: number
  categoriaId: number | null
}

export interface ItemPedido {
  produtoId: number
  quantidade: number
}

export interface Pedido {
  id: number
  clienteId: number
  itens: ItemPedido[]
  total: number
  criadoEm: string
}

export interface ScoreCliente {
  clienteId: number
  scoring: number
  riscoChurn: RiscoChurn
  ultimoPedido: string
  totalPedidos: number
  ticketMedio: number
}

export interface NovoCliente {
  nome: string
  email: string
  cidade: string
  estado: string
  pais: string
  temPlano: boolean
}

export interface NovoProduto {
  nome: string
  preco: number
  estoque: number
  categoriaId: number | null
}

export interface NovaCategoria {
  nome: string
}

export interface NovoPedido {
  clienteId: number
  itens: ItemPedido[]
}

export interface ResumoDashboard {
  totalClientes: number
  receitaTotal: number
  ticketMedio: number
  taxaChurn: number
  clientesRiscoAlto: number
}

export interface VendaMes {
  mes: string
  total: number
}

export interface VendaLocal {
  rotulo: string
  total: number
}

export interface ReceitaProduto {
  produtoId: number
  nome: string
  quantidade: number
  receita: number
}

export interface TopCliente {
  clienteId: number
  nome: string
  estado: string
  totalPedidos: number
  scoring: number
  riscoChurn: RiscoChurn
  ultimoPedido: string
}

export interface TopProduto {
  produtoId: number
  nome: string
  quantidade: number
}

export interface PedidoRecente {
  id: number
  clienteNome: string
  total: number
  criadoEm: string
}

export interface ProjecaoReceita {
  receitaAtual: number
  ticketMedio: number
  clientesAltoScoring: number
  receitaProjetada: number
  clientesRiscoAlto: number
  receitaEmRisco: number
}

export interface ResumoChurn {
  alto: number
  medio: number
  baixo: number
  distribuicaoScoring: { faixa: string; quantidade: number }[]
}
