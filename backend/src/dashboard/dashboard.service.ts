import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IaService } from '../ia/ia.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
    private ia: IaService,
  ) {}

  async resumo() {
    const totalClientes = await this.prisma.cliente.count();
    const pedidos = await this.prisma.pedido.findMany({ select: { total: true } });
    const receitaTotal = pedidos.reduce((soma, p) => soma + p.total, 0);
    const ticketMedio = totalClientes > 0 ? receitaTotal / totalClientes : 0;

    const scores = await this.ia.listarScores().catch(() => []);
    const clientesRiscoAlto = scores.filter((s: any) => s.riscoChurn === 'alto').length;
    const taxaChurn = totalClientes > 0 ? (clientesRiscoAlto / totalClientes) * 100 : 0;

    return { totalClientes, receitaTotal, ticketMedio, taxaChurn, clientesRiscoAlto };
  }
}
