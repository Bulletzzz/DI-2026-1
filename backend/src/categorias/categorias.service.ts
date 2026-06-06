import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NovaCategoriaDto } from './categorias.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  listar() {
    return this.prisma.categoria.findMany();
  }

  async buscar(id: number) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new NotFoundException('Categoria não encontrada');
    return categoria;
  }

  criar(dto: NovaCategoriaDto) {
    return this.prisma.categoria.create({ data: dto });
  }

  async atualizar(id: number, dto: NovaCategoriaDto) {
    await this.buscar(id);
    return this.prisma.categoria.update({ where: { id }, data: dto });
  }

  async remover(id: number) {
    await this.buscar(id);
    await this.prisma.categoria.delete({ where: { id } });
  }
}
