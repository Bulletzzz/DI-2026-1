import { PrismaService } from '../prisma.service';
import { NovoPedidoDto } from './pedidos.dto';
export declare class PedidosService {
    private prisma;
    constructor(prisma: PrismaService);
    listar(): Promise<any[]>;
    buscar(id: number): Promise<any>;
    criar(dto: NovoPedidoDto): Promise<any>;
    remover(id: number): Promise<void>;
}
