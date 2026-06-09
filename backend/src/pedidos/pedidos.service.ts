import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NovoPedidoDto } from './pedidos.dto';

const incluirItens = {
  itens: { select: { produtoId: true, quantidade: true } },
};

function formatarPedido(pedido: any) {
  return { ...pedido, criadoEm: pedido.criadoEm.toISOString().split('T')[0] };
}

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    const pedidos = await this.prisma.pedido.findMany({ include: incluirItens });
    return pedidos.map(formatarPedido);
  }

  async buscar(id: number) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id }, include: incluirItens });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    return formatarPedido(pedido);
  }

  async criar(dto: NovoPedidoDto) {
    const quantidadePorProduto = new Map<number, number>();
    for (const item of dto.itens) {
      const acumulado = quantidadePorProduto.get(item.produtoId) ?? 0;
      quantidadePorProduto.set(item.produtoId, acumulado + item.quantidade);
    }

    const ids = [...quantidadePorProduto.keys()];
    const produtos = await this.prisma.produto.findMany({ where: { id: { in: ids } } });

    if (produtos.length !== ids.length) {
      throw new BadRequestException('Um ou mais produtos não foram encontrados');
    }

    for (const produto of produtos) {
      const pedida = quantidadePorProduto.get(produto.id)!;
      if (produto.estoque < pedida) {
        throw new BadRequestException(`Estoque insuficiente para ${produto.nome}`);
      }
    }

    const total = dto.itens.reduce((soma, item) => {
      const produto = produtos.find((p) => p.id === item.produtoId)!;
      return soma + produto.preco * item.quantidade;
    }, 0);

    const pedido = await this.prisma.$transaction(async (tx) => {
      const criado = await tx.pedido.create({
        data: {
          clienteId: dto.clienteId,
          total,
          itens: { create: dto.itens },
        },
        include: incluirItens,
      });

      for (const [produtoId, quantidade] of quantidadePorProduto) {
        await tx.produto.update({
          where: { id: produtoId },
          data: { estoque: { decrement: quantidade } },
        });
      }

      return criado;
    });

    return formatarPedido(pedido);
  }

  async remover(id: number) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id }, include: incluirItens });
    if (!pedido) throw new NotFoundException('Pedido não encontrado');

    await this.prisma.$transaction(async (tx) => {
      for (const item of pedido.itens) {
        await tx.produto.update({
          where: { id: item.produtoId },
          data: { estoque: { increment: item.quantidade } },
        });
      }
      await tx.itemPedido.deleteMany({ where: { pedidoId: id } });
      await tx.pedido.delete({ where: { id } });
    });
  }
}
