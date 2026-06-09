import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private service;
    constructor(service: DashboardService);
    resumo(): Promise<{
        totalClientes: number;
        receitaTotal: number;
        ticketMedio: number;
        taxaChurn: number;
        clientesRiscoAlto: any;
    }>;
}
