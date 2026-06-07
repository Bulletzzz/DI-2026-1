import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

@Injectable()
export class RelatoriosService {
  constructor(private prisma: PrismaService) {}

  async vendasPorMes() {
    const pedidos = await this.prisma.pedido.findMany({ select: { total: true, criadoEm: true } });

    const grupos: Record<number, number> = {};
    for (const p of pedidos) {
      const idx = p.criadoEm.getMonth();
      grupos[idx] = (grupos[idx] ?? 0) + p.total;
    }

    return Object.entries(grupos)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([idx, total]) => ({ mes: MESES[Number(idx)], total }));
  }

  async vendasPorCidade() {
    const pedidos = await this.prisma.pedido.findMany({
      include: { cliente: { select: { cidade: true } } },
    });

    const grupos: Record<string, number> = {};
    for (const p of pedidos) {
      const cidade = p.cliente.cidade;
      grupos[cidade] = (grupos[cidade] ?? 0) + p.total;
    }

    return Object.entries(grupos).map(([rotulo, total]) => ({ rotulo, total }));
  }

  async receitaPorProduto() {
    const itens = await this.prisma.itemPedido.findMany({
      include: { produto: { select: { id: true, nome: true, preco: true } } },
    });

    const grupos: Record<number, { nome: string; quantidade: number; receita: number }> = {};
    for (const item of itens) {
      const { id, nome, preco } = item.produto;
      if (!grupos[id]) grupos[id] = { nome, quantidade: 0, receita: 0 };
      grupos[id].quantidade += item.quantidade;
      grupos[id].receita += item.quantidade * preco;
    }

    return Object.entries(grupos)
      .map(([produtoId, dados]) => ({ produtoId: Number(produtoId), ...dados }))
      .sort((a, b) => b.receita - a.receita);
  }

  async topClientes(limite: number) {
    const pedidos = await this.prisma.pedido.findMany({
      include: { cliente: { select: { id: true, nome: true, estado: true } } },
    });

    const grupos: Record<number, { nome: string; estado: string; totalPedidos: number; ultimoPedido: Date }> = {};
    for (const p of pedidos) {
      const { id, nome, estado } = p.cliente;
      if (!grupos[id]) grupos[id] = { nome, estado, totalPedidos: 0, ultimoPedido: p.criadoEm };
      grupos[id].totalPedidos += 1;
      if (p.criadoEm > grupos[id].ultimoPedido) grupos[id].ultimoPedido = p.criadoEm;
    }

    return Object.entries(grupos)
      .map(([clienteId, dados]) => ({
        clienteId: Number(clienteId),
        nome: dados.nome,
        estado: dados.estado,
        totalPedidos: dados.totalPedidos,
        ultimoPedido: dados.ultimoPedido.toISOString().split('T')[0],
        scoring: 0,
        riscoChurn: 'baixo' as const,
      }))
      .sort((a, b) => b.totalPedidos - a.totalPedidos)
      .slice(0, limite);
  }

  async topProdutos(limite: number) {
    const itens = await this.prisma.itemPedido.findMany({
      include: { produto: { select: { id: true, nome: true } } },
    });

    const grupos: Record<number, { nome: string; quantidade: number }> = {};
    for (const item of itens) {
      if (!grupos[item.produtoId]) grupos[item.produtoId] = { nome: item.produto.nome, quantidade: 0 };
      grupos[item.produtoId].quantidade += item.quantidade;
    }

    return Object.entries(grupos)
      .map(([produtoId, dados]) => ({ produtoId: Number(produtoId), ...dados }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, limite);
  }

  async pedidosRecentes(limite: number) {
    const pedidos = await this.prisma.pedido.findMany({
      orderBy: { criadoEm: 'desc' },
      take: limite,
      include: { cliente: { select: { nome: true } } },
    });

    return pedidos.map((p) => ({
      id: p.id,
      clienteNome: p.cliente.nome,
      total: p.total,
      criadoEm: p.criadoEm.toISOString().split('T')[0],
    }));
  }

  async projecaoReceita() {
    const pedidos = await this.prisma.pedido.findMany({ select: { total: true } });
    const totalClientes = await this.prisma.cliente.count();
    const receitaAtual = pedidos.reduce((soma, p) => soma + p.total, 0);
    const ticketMedio = totalClientes > 0 ? receitaAtual / totalClientes : 0;

    return {
      receitaAtual,
      ticketMedio,
      clientesAltoScoring: 0,
      receitaProjetada: 0,
      clientesRiscoAlto: 0,
      receitaEmRisco: 0,
    };
  }
}
