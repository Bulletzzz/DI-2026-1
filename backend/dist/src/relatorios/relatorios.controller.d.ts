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
    topClientes(limite?: string): Promise<any>;
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
        clientesAltoScoring: any;
        receitaProjetada: number;
        clientesRiscoAlto: any;
        receitaEmRisco: number;
    }>;
}
