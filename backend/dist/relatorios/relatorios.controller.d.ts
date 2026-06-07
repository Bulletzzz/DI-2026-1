import { RelatoriosService } from './relatorios.service';
export declare class RelatoriosController {
    private service;
    constructor(service: RelatoriosService);
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
    topClientes(limite?: string): Promise<{
        clienteId: number;
        nome: string;
        estado: string;
        totalPedidos: number;
        ultimoPedido: string;
        scoring: number;
        riscoChurn: "baixo";
    }[]>;
    topProdutos(limite?: string): Promise<{
        nome: string;
        quantidade: number;
        produtoId: number;
    }[]>;
    pedidosRecentes(limite?: string): Promise<{
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
