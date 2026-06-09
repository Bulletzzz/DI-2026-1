import { PrismaService } from '../prisma.service';
import { NovoProdutoDto } from './produtos.dto';
export declare class ProdutosService {
    private prisma;
    constructor(prisma: PrismaService);
    listar(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }[]>;
    buscar(id: number): Promise<{
        id: number;
        nome: string;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }>;
    criar(dto: NovoProdutoDto): import("@prisma/client").Prisma.Prisma__ProdutoClient<{
        id: number;
        nome: string;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    atualizar(id: number, dto: NovoProdutoDto): Promise<{
        id: number;
        nome: string;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }>;
    remover(id: number): Promise<void>;
}
