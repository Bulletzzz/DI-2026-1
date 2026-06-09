"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const incluirItens = {
    itens: { select: { produtoId: true, quantidade: true } },
};
function formatarPedido(pedido) {
    return { ...pedido, criadoEm: pedido.criadoEm.toISOString().split('T')[0] };
}
let PedidosService = class PedidosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listar() {
        const pedidos = await this.prisma.pedido.findMany({ include: incluirItens });
        return pedidos.map(formatarPedido);
    }
    async buscar(id) {
        const pedido = await this.prisma.pedido.findUnique({ where: { id }, include: incluirItens });
        if (!pedido)
            throw new common_1.NotFoundException('Pedido não encontrado');
        return formatarPedido(pedido);
    }
    async criar(dto) {
        const quantidadePorProduto = new Map();
        for (const item of dto.itens) {
            const acumulado = quantidadePorProduto.get(item.produtoId) ?? 0;
            quantidadePorProduto.set(item.produtoId, acumulado + item.quantidade);
        }
        const ids = [...quantidadePorProduto.keys()];
        const produtos = await this.prisma.produto.findMany({ where: { id: { in: ids } } });
        if (produtos.length !== ids.length) {
            throw new common_1.BadRequestException('Um ou mais produtos não foram encontrados');
        }
        for (const produto of produtos) {
            const pedida = quantidadePorProduto.get(produto.id);
            if (produto.estoque < pedida) {
                throw new common_1.BadRequestException(`Estoque insuficiente para ${produto.nome}`);
            }
        }
        const total = dto.itens.reduce((soma, item) => {
            const produto = produtos.find((p) => p.id === item.produtoId);
            return soma + produto.preco * item.quantidade;
        }, 0);
        const pedido = await this.prisma.$transaction(async (tx) => {
            const criado = await tx.pedido.create({
                data: {
                    clienteId: dto.clienteId,
                    total,
                    itens: { create: dto.itens },
                },
                include: incluirItens,
            });
            for (const [produtoId, quantidade] of quantidadePorProduto) {
                await tx.produto.update({
                    where: { id: produtoId },
                    data: { estoque: { decrement: quantidade } },
                });
            }
            return criado;
        });
        return formatarPedido(pedido);
    }
    async remover(id) {
        const pedido = await this.prisma.pedido.findUnique({ where: { id }, include: incluirItens });
        if (!pedido)
            throw new common_1.NotFoundException('Pedido não encontrado');
        await this.prisma.$transaction(async (tx) => {
            for (const item of pedido.itens) {
                await tx.produto.update({
                    where: { id: item.produtoId },
                    data: { estoque: { increment: item.quantidade } },
                });
            }
            await tx.itemPedido.deleteMany({ where: { pedidoId: id } });
            await tx.pedido.delete({ where: { id } });
        });
    }
};
exports.PedidosService = PedidosService;
exports.PedidosService = PedidosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PedidosService);
//# sourceMappingURL=pedidos.service.js.map