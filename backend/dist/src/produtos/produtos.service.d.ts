import { PrismaService } from '../prisma.service';
import { NovoProdutoDto } from './produtos.dto';
export declare class ProdutosService {
    private prisma;
    constructor(prisma: PrismaService);
    listar(): import("@prisma/client").Prisma.PrismaPromise<{
        nome: string;
        id: number;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }[]>;
    buscar(id: number): Promise<{
        nome: string;
        id: number;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }>;
    criar(dto: NovoProdutoDto): import("@prisma/client").Prisma.Prisma__ProdutoClient<{
        nome: string;
        id: number;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    atualizar(id: number, dto: NovoProdutoDto): Promise<{
        nome: string;
        id: number;
        preco: number;
        estoque: number;
        categoriaId: number | null;
    }>;
    remover(id: number): Promise<void>;
}
