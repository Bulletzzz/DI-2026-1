import { PrismaService } from '../prisma.service';
import { NovaCategoriaDto } from './categorias.dto';
export declare class CategoriasService {
    private prisma;
    constructor(prisma: PrismaService);
    listar(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
    }[]>;
    buscar(id: number): Promise<{
        id: number;
        nome: string;
    }>;
    criar(dto: NovaCategoriaDto): import("@prisma/client").Prisma.Prisma__CategoriaClient<{
        id: number;
        nome: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    atualizar(id: number, dto: NovaCategoriaDto): Promise<{
        id: number;
        nome: string;
    }>;
    remover(id: number): Promise<void>;
}
