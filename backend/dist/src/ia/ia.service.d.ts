export declare class IaService {
    listarScores(): Promise<any>;
    buscarScore(clienteId: number): Promise<any>;
    resumoChurn(): Promise<{
        alto: any;
        medio: any;
        baixo: any;
        distribuicaoScoring: {
            faixa: string;
            quantidade: any;
        }[];
    }>;
}
