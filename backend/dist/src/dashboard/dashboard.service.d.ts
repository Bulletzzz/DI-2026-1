import { PrismaService } from '../prisma.service';
import { IaService } from '../ia/ia.service';
export declare class DashboardService {
    private prisma;
    private ia;
    constructor(prisma: PrismaService, ia: IaService);
    resumo(): Promise<{
        totalClientes: number;
        receitaTotal: number;
        ticketMedio: number;
        taxaChurn: number;
        clientesRiscoAlto: any;
    }>;
}
