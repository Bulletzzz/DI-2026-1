import { PrismaService } from '../prisma.service';
import { NovoClienteDto } from './clientes.dto';
export declare class ClientesService {
    private prisma;
    constructor(prisma: PrismaService);
    listar(): Promise<any[]>;
    buscar(id: number): Promise<any>;
    criar(dto: NovoClienteDto): Promise<any>;
    atualizar(id: number, dto: NovoClienteDto): Promise<any>;
    remover(id: number): Promise<void>;
}
