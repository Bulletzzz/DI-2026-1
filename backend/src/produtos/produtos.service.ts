import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NovoProdutoDto } from './produtos.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  listar() {
    return this.prisma.produto.findMany();
  }

  async buscar(id: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) throw new NotFoundException('Produto não encontrado');
    return produto;
  }

  criar(dto: NovoProdutoDto) {
    return this.prisma.produto.create({ data: dto });
  }

  async atualizar(id: number, dto: NovoProdutoDto) {
    await this.buscar(id);
    return this.prisma.produto.update({ where: { id }, data: dto });
  }

  async remover(id: number) {
    await this.buscar(id);
    await this.prisma.produto.delete({ where: { id } });
  }
}
