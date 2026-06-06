import { PedidosService } from './pedidos.service';
import { NovoPedidoDto } from './pedidos.dto';
export declare class PedidosController {
    private service;
    constructor(service: PedidosService);
    listar(): Promise<any[]>;
    buscar(id: number): Promise<any>;
    criar(dto: NovoPedidoDto): Promise<any>;
    remover(id: number): Promise<void>;
}
