import { PrismaService } from '../prisma.service';
import { NovaCategoriaDto } from './categorias.dto';
export declare class CategoriasService {
    private prisma;
    constructor(prisma: PrismaService);
    listar(): import("@prisma/client").Prisma.PrismaPromise<{
        nome: string;
        id: number;
    }[]>;
    buscar(id: number): Promise<{
        nome: string;
        id: number;
    }>;
    criar(dto: NovaCategoriaDto): import("@prisma/client").Prisma.Prisma__CategoriaClient<{
        nome: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    atualizar(id: number, dto: NovaCategoriaDto): Promise<{
        nome: string;
        id: number;
    }>;
    remover(id: number): Promise<void>;
}
