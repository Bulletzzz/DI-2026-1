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
    const ids = dto.itens.map((i) => i.produtoId);
    const produtos = await this.prisma.produto.findMany({ where: { id: { in: ids } } });

    if (produtos.length !== ids.length) {
      throw new BadRequestException('Um ou mais produtos não foram encontrados');
    }

    const total = dto.itens.reduce((soma, item) => {
      const produto = produtos.find((p) => p.id === item.produtoId)!;
      return soma + produto.preco * item.quantidade;
    }, 0);

    const pedido = await this.prisma.pedido.create({
      data: {
        clienteId: dto.clienteId,
        total,
        itens: { create: dto.itens },
      },
      include: incluirItens,
    });

    return formatarPedido(pedido);
  }

  async remover(id: number) {
    await this.buscar(id);
    await this.prisma.itemPedido.deleteMany({ where: { pedidoId: id } });
    await this.prisma.pedido.delete({ where: { id } });
  }
}
