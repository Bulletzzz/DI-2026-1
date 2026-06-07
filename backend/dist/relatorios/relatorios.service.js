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
exports.RelatoriosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
let RelatoriosService = class RelatoriosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async vendasPorMes() {
        const pedidos = await this.prisma.pedido.findMany({ select: { total: true, criadoEm: true } });
        const grupos = {};
        for (const p of pedidos) {
            const idx = p.criadoEm.getMonth();
            grupos[idx] = (grupos[idx] ?? 0) + p.total;
        }
        return Object.entries(grupos)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([idx, total]) => ({ mes: MESES[Number(idx)], total }));
    }
    async vendasPorCidade() {
        const pedidos = await this.prisma.pedido.findMany({
            include: { cliente: { select: { cidade: true } } },
        });
        const grupos = {};
        for (const p of pedidos) {
            const cidade = p.cliente.cidade;
            grupos[cidade] = (grupos[cidade] ?? 0) + p.total;
        }
        return Object.entries(grupos).map(([rotulo, total]) => ({ rotulo, total }));
    }
    async receitaPorProduto() {
        const itens = await this.prisma.itemPedido.findMany({
            include: { produto: { select: { id: true, nome: true, preco: true } } },
        });
        const grupos = {};
        for (const item of itens) {
            const { id, nome, preco } = item.produto;
            if (!grupos[id])
                grupos[id] = { nome, quantidade: 0, receita: 0 };
            grupos[id].quantidade += item.quantidade;
            grupos[id].receita += item.quantidade * preco;
        }
        return Object.entries(grupos)
            .map(([produtoId, dados]) => ({ produtoId: Number(produtoId), ...dados }))
            .sort((a, b) => b.receita - a.receita);
    }
    async topClientes(limite) {
        const pedidos = await this.prisma.pedido.findMany({
            include: { cliente: { select: { id: true, nome: true, estado: true } } },
        });
        const grupos = {};
        for (const p of pedidos) {
            const { id, nome, estado } = p.cliente;
            if (!grupos[id])
                grupos[id] = { nome, estado, totalPedidos: 0, ultimoPedido: p.criadoEm };
            grupos[id].totalPedidos += 1;
            if (p.criadoEm > grupos[id].ultimoPedido)
                grupos[id].ultimoPedido = p.criadoEm;
        }
        return Object.entries(grupos)
            .map(([clienteId, dados]) => ({
            clienteId: Number(clienteId),
            nome: dados.nome,
            estado: dados.estado,
            totalPedidos: dados.totalPedidos,
            ultimoPedido: dados.ultimoPedido.toISOString().split('T')[0],
            scoring: 0,
            riscoChurn: 'baixo',
        }))
            .sort((a, b) => b.totalPedidos - a.totalPedidos)
            .slice(0, limite);
    }
    async topProdutos(limite) {
        const itens = await this.prisma.itemPedido.findMany({
            include: { produto: { select: { id: true, nome: true } } },
        });
        const grupos = {};
        for (const item of itens) {
            if (!grupos[item.produtoId])
                grupos[item.produtoId] = { nome: item.produto.nome, quantidade: 0 };
            grupos[item.produtoId].quantidade += item.quantidade;
        }
        return Object.entries(grupos)
            .map(([produtoId, dados]) => ({ produtoId: Number(produtoId), ...dados }))
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, limite);
    }
    async pedidosRecentes(limite) {
        const pedidos = await this.prisma.pedido.findMany({
            orderBy: { criadoEm: 'desc' },
            take: limite,
            include: { cliente: { select: { nome: true } } },
        });
        return pedidos.map((p) => ({
            id: p.id,
            clienteNome: p.cliente.nome,
            total: p.total,
            criadoEm: p.criadoEm.toISOString().split('T')[0],
        }));
    }
    async projecaoReceita() {
        const pedidos = await this.prisma.pedido.findMany({ select: { total: true } });
        const totalClientes = await this.prisma.cliente.count();
        const receitaAtual = pedidos.reduce((soma, p) => soma + p.total, 0);
        const ticketMedio = totalClientes > 0 ? receitaAtual / totalClientes : 0;
        return {
            receitaAtual,
            ticketMedio,
            clientesAltoScoring: 0,
            receitaProjetada: 0,
            clientesRiscoAlto: 0,
            receitaEmRisco: 0,
        };
    }
};
exports.RelatoriosService = RelatoriosService;
exports.RelatoriosService = RelatoriosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RelatoriosService);
//# sourceMappingURL=relatorios.service.js.map