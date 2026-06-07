import { PrismaService } from '../prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    resumo(): Promise<{
        totalClientes: number;
        receitaTotal: number;
        ticketMedio: number;
        taxaChurn: number;
        clientesRiscoAlto: number;
    }>;
}
