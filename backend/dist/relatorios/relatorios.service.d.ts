import { PrismaService } from '../prisma.service';
export declare class RelatoriosService {
    private prisma;
    constructor(prisma: PrismaService);
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
    topClientes(limite: number): Promise<{
        clienteId: number;
        nome: string;
        estado: string;
        totalPedidos: number;
        ultimoPedido: string;
        scoring: number;
        riscoChurn: "baixo";
    }[]>;
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
        clientesAltoScoring: number;
        receitaProjetada: number;
        clientesRiscoAlto: number;
        receitaEmRisco: number;
    }>;
}
