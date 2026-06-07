import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async resumo() {
    const totalClientes = await this.prisma.cliente.count();
    const pedidos = await this.prisma.pedido.findMany({ select: { total: true } });
    const receitaTotal = pedidos.reduce((soma, p) => soma + p.total, 0);
    const ticketMedio = totalClientes > 0 ? receitaTotal / totalClientes : 0;

    return {
      totalClientes,
      receitaTotal,
      ticketMedio,
      taxaChurn: 0,
      clientesRiscoAlto: 0,
    };
  }
}
