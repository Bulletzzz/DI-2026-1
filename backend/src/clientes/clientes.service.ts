import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NovoClienteDto } from './clientes.dto';

function formatarData(data: Date): string {
  return data.toISOString().split('T')[0];
}

function formatarCliente(cliente: any) {
  return { ...cliente, criadoEm: formatarData(cliente.criadoEm) };
}

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    const clientes = await this.prisma.cliente.findMany();
    return clientes.map(formatarCliente);
  }

  async buscar(id: number) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return formatarCliente(cliente);
  }

  async criar(dto: NovoClienteDto) {
    const cliente = await this.prisma.cliente.create({ data: dto });
    return formatarCliente(cliente);
  }

  async atualizar(id: number, dto: NovoClienteDto) {
    await this.buscar(id);
    const cliente = await this.prisma.cliente.update({ where: { id }, data: dto });
    return formatarCliente(cliente);
  }

  async remover(id: number) {
    await this.buscar(id);
    await this.prisma.cliente.delete({ where: { id } });
  }
}
