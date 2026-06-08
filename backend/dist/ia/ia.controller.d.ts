import { IaService } from './ia.service';
export declare class IaController {
    private service;
    constructor(service: IaService);
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
