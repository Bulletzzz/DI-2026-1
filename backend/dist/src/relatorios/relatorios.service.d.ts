import { PrismaService } from '../prisma.service';
import { IaService } from '../ia/ia.service';
export declare class RelatoriosService {
    private prisma;
    private ia;
    constructor(prisma: PrismaService, ia: IaService);
    vendasPorMes(): Promise<{
        mes: string;
        total: number;
    }[]>;
    vendasPorCidade(): Promise<{
        rotulo: string;
        total: number;
    }[]>;
    receitaPorProduto(): Promise<{
        nome: string;
        quantidade: number;
        receita: number;
        produtoId: number;
    }[]>;
    topClientes(limite: number): Promise<any>;
    topProdutos(limite: number): Promise<{
        nome: string;
        quantidade: number;
        produtoId: number;
    }[]>;
    pedidosRecentes(limite: number): Promise<{
        id: number;
        clienteNome: string;
        total: number;
        criadoEm: string;
    }[]>;
    projecaoReceita(): Promise<{
        receitaAtual: number;
        ticketMedio: number;
        clientesAltoScoring: any;
        receitaProjetada: number;
        clientesRiscoAlto: any;
        receitaEmRisco: number;
    }>;
}
