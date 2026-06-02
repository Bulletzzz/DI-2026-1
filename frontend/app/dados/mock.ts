export type RiscoChurn = "alto" | "medio" | "baixo"

export interface Cliente {
  id: number
  nome: string
  email: string
  cidade: string
  estado: string
  pais: string
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

export const categorias: Categoria[] = [
  { id: 1, nome: "Planos" },
  { id: 2, nome: "Suplementos" },
]

export const produtos: Produto[] = [
  { id: 1, nome: "Plano Mensal",     preco: 99.90,  estoque: 999, categoriaId: 1 },
  { id: 2, nome: "Plano Trimestral", preco: 259.90, estoque: 999, categoriaId: 1 },
  { id: 3, nome: "Plano Semestral",  preco: 479.90, estoque: 999, categoriaId: 1 },
  { id: 4, nome: "Plano Anual",      preco: 899.90, estoque: 999, categoriaId: 1 },
  { id: 5, nome: "Whey Protein",     preco: 149.90, estoque: 45,  categoriaId: 2 },
  { id: 6, nome: "Creatina",         preco: 89.90,  estoque: 32,  categoriaId: 2 },
  { id: 7, nome: "BCAA",             preco: 79.90,  estoque: 28,  categoriaId: 2 },
  { id: 8, nome: "Pré-treino",       preco: 119.90, estoque: 15,  categoriaId: 2 },
]

export const clientes: Cliente[] = [
  { id: 1,  nome: "Bernardo Manga",    email: "bernardo@beast.com",    cidade: "Curitiba",      estado: "PR", pais: "Brasil", criadoEm: "2024-01-10" },
  { id: 2,  nome: "Moaca Barbosa",     email: "moaca@gmail.com",       cidade: "São Paulo",     estado: "SP", pais: "Brasil", criadoEm: "2024-01-22" },
  { id: 3,  nome: "Felipe Manga",      email: "felipe@outlook.com",    cidade: "Curitiba",      estado: "PR", pais: "Brasil", criadoEm: "2024-02-05" },
  { id: 4,  nome: "Lucas Barbosa",     email: "lucas@gmail.com",       cidade: "Porto Alegre",  estado: "RS", pais: "Brasil", criadoEm: "2024-02-18" },
  { id: 5,  nome: "Caio Manga",        email: "caio@yahoo.com",        cidade: "Florianópolis", estado: "SC", pais: "Brasil", criadoEm: "2024-03-01" },
  { id: 6,  nome: "Rafael Moaca",      email: "rafael@beast.com",      cidade: "Rio de Janeiro",estado: "RJ", pais: "Brasil", criadoEm: "2024-03-14" },
  { id: 7,  nome: "André Barbosa",     email: "andre@hotmail.com",     cidade: "Belo Horizonte",estado: "MG", pais: "Brasil", criadoEm: "2024-03-28" },
  { id: 8,  nome: "Thiago Manga",      email: "thiago@gmail.com",      cidade: "Salvador",      estado: "BA", pais: "Brasil", criadoEm: "2024-04-10" },
  { id: 9,  nome: "Rodrigo Barbosa",   email: "rodrigo@outlook.com",   cidade: "Recife",        estado: "PE", pais: "Brasil", criadoEm: "2024-04-22" },
  { id: 10, nome: "Gabriel Manga",     email: "gabriel@gmail.com",     cidade: "Fortaleza",     estado: "CE", pais: "Brasil", criadoEm: "2024-05-05" },
  { id: 11, nome: "Diego Moaca",       email: "diego@beast.com",       cidade: "Curitiba",      estado: "PR", pais: "Brasil", criadoEm: "2024-05-19" },
  { id: 12, nome: "Bruno Barbosa",     email: "bruno@gmail.com",       cidade: "São Paulo",     estado: "SP", pais: "Brasil", criadoEm: "2024-06-02" },
]

export const pedidos: Pedido[] = [
  { id: 1,  clienteId: 1,  itens: [{ produtoId: 4, quantidade: 1 }, { produtoId: 5, quantidade: 1 }], total: 1049.80, criadoEm: "2024-01-15" },
  { id: 2,  clienteId: 2,  itens: [{ produtoId: 1, quantidade: 1 }],                                  total: 99.90,   criadoEm: "2024-01-25" },
  { id: 3,  clienteId: 3,  itens: [{ produtoId: 2, quantidade: 1 }, { produtoId: 6, quantidade: 2 }], total: 439.70,  criadoEm: "2024-02-08" },
  { id: 4,  clienteId: 4,  itens: [{ produtoId: 3, quantidade: 1 }],                                  total: 479.90,  criadoEm: "2024-02-20" },
  { id: 5,  clienteId: 1,  itens: [{ produtoId: 4, quantidade: 1 }],                                  total: 899.90,  criadoEm: "2024-03-15" },
  { id: 6,  clienteId: 5,  itens: [{ produtoId: 1, quantidade: 1 }, { produtoId: 7, quantidade: 1 }], total: 179.80,  criadoEm: "2024-03-05" },
  { id: 7,  clienteId: 6,  itens: [{ produtoId: 2, quantidade: 1 }, { produtoId: 8, quantidade: 1 }], total: 379.80,  criadoEm: "2024-03-18" },
  { id: 8,  clienteId: 7,  itens: [{ produtoId: 4, quantidade: 1 }, { produtoId: 5, quantidade: 2 }], total: 1199.70, criadoEm: "2024-04-01" },
  { id: 9,  clienteId: 2,  itens: [{ produtoId: 1, quantidade: 1 }],                                  total: 99.90,   criadoEm: "2024-04-25" },
  { id: 10, clienteId: 8,  itens: [{ produtoId: 3, quantidade: 1 }, { produtoId: 6, quantidade: 1 }], total: 569.80,  criadoEm: "2024-04-12" },
  { id: 11, clienteId: 9,  itens: [{ produtoId: 2, quantidade: 1 }],                                  total: 259.90,  criadoEm: "2024-05-05" },
  { id: 12, clienteId: 10, itens: [{ produtoId: 1, quantidade: 1 }, { produtoId: 7, quantidade: 2 }], total: 259.70,  criadoEm: "2024-05-10" },
  { id: 13, clienteId: 11, itens: [{ produtoId: 4, quantidade: 1 }],                                  total: 899.90,  criadoEm: "2024-05-22" },
  { id: 14, clienteId: 12, itens: [{ produtoId: 3, quantidade: 1 }, { produtoId: 8, quantidade: 1 }], total: 599.80,  criadoEm: "2024-06-05" },
  { id: 15, clienteId: 1,  itens: [{ produtoId: 4, quantidade: 1 }, { produtoId: 5, quantidade: 1 }, { produtoId: 6, quantidade: 1 }], total: 1139.70, criadoEm: "2024-06-15" },
  { id: 16, clienteId: 3,  itens: [{ produtoId: 2, quantidade: 1 }],                                  total: 259.90,  criadoEm: "2024-06-20" },
  { id: 17, clienteId: 4,  itens: [{ produtoId: 3, quantidade: 1 }, { produtoId: 7, quantidade: 1 }], total: 559.80,  criadoEm: "2024-07-03" },
  { id: 18, clienteId: 6,  itens: [{ produtoId: 1, quantidade: 1 }],                                  total: 99.90,   criadoEm: "2024-07-14" },
  { id: 19, clienteId: 5,  itens: [{ produtoId: 4, quantidade: 1 }],                                  total: 899.90,  criadoEm: "2024-07-25" },
  { id: 20, clienteId: 8,  itens: [{ produtoId: 2, quantidade: 1 }, { produtoId: 5, quantidade: 1 }], total: 409.80,  criadoEm: "2024-08-05" },
]

export const scoreClientes: ScoreCliente[] = [
  { clienteId: 1,  scoring: 92, riscoChurn: "baixo", ultimoPedido: "2024-06-15", totalPedidos: 3, ticketMedio: 1029.80 },
  { clienteId: 2,  scoring: 34, riscoChurn: "alto",  ultimoPedido: "2024-04-25", totalPedidos: 2, ticketMedio: 99.90   },
  { clienteId: 3,  scoring: 61, riscoChurn: "medio", ultimoPedido: "2024-06-20", totalPedidos: 2, ticketMedio: 349.80  },
  { clienteId: 4,  scoring: 55, riscoChurn: "medio", ultimoPedido: "2024-07-03", totalPedidos: 2, ticketMedio: 519.85  },
  { clienteId: 5,  scoring: 78, riscoChurn: "baixo", ultimoPedido: "2024-07-25", totalPedidos: 2, ticketMedio: 539.85  },
  { clienteId: 6,  scoring: 42, riscoChurn: "medio", ultimoPedido: "2024-07-14", totalPedidos: 2, ticketMedio: 239.85  },
  { clienteId: 7,  scoring: 88, riscoChurn: "baixo", ultimoPedido: "2024-04-01", totalPedidos: 1, ticketMedio: 1199.70 },
  { clienteId: 8,  scoring: 67, riscoChurn: "medio", ultimoPedido: "2024-08-05", totalPedidos: 2, ticketMedio: 489.80  },
  { clienteId: 9,  scoring: 22, riscoChurn: "alto",  ultimoPedido: "2024-05-05", totalPedidos: 1, ticketMedio: 259.90  },
  { clienteId: 10, scoring: 45, riscoChurn: "medio", ultimoPedido: "2024-05-10", totalPedidos: 1, ticketMedio: 259.70  },
  { clienteId: 11, scoring: 71, riscoChurn: "baixo", ultimoPedido: "2024-05-22", totalPedidos: 1, ticketMedio: 899.90  },
  { clienteId: 12, scoring: 18, riscoChurn: "alto",  ultimoPedido: "2024-06-05", totalPedidos: 1, ticketMedio: 599.80  },
]

export const vendasPorMes = [
  { mes: "Jan", total: 1149.70 },
  { mes: "Fev", total: 919.60  },
  { mes: "Mar", total: 1159.50 },
  { mes: "Abr", total: 869.60  },
  { mes: "Mai", total: 2059.50 },
  { mes: "Jun", total: 1899.40 },
  { mes: "Jul", total: 1659.60 },
  { mes: "Ago", total: 409.80  },
]

export const vendasPorEstado = [
  { estado: "PR", total: 3339.30 },
  { estado: "SP", total: 699.70  },
  { estado: "RS", total: 559.80  },
  { estado: "MG", total: 1199.70 },
  { estado: "RJ", total: 379.80  },
  { estado: "BA", total: 569.80  },
  { estado: "SC", total: 179.80  },
  { estado: "PE", total: 259.90  },
  { estado: "CE", total: 259.70  },
]

export function formatarReais(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function formatarData(data: string): string {
  return new Date(data + "T00:00:00").toLocaleDateString("pt-BR")
}
