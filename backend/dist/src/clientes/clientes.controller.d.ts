import { ClientesService } from './clientes.service';
import { NovoClienteDto } from './clientes.dto';
export declare class ClientesController {
    private service;
    constructor(service: ClientesService);
    listar(): Promise<any[]>;
    buscar(id: number): Promise<any>;
    criar(dto: NovoClienteDto): Promise<any>;
    atualizar(id: number, dto: NovoClienteDto): Promise<any>;
    remover(id: number): Promise<void>;
}
