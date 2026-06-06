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
exports.ProdutosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProdutosService = class ProdutosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    listar() {
        return this.prisma.produto.findMany();
    }
    async buscar(id) {
        const produto = await this.prisma.produto.findUnique({ where: { id } });
        if (!produto)
            throw new common_1.NotFoundException('Produto não encontrado');
        return produto;
    }
    criar(dto) {
        return this.prisma.produto.create({ data: dto });
    }
    async atualizar(id, dto) {
        await this.buscar(id);
        return this.prisma.produto.update({ where: { id }, data: dto });
    }
    async remover(id) {
        await this.buscar(id);
        await this.prisma.produto.delete({ where: { id } });
    }
};
exports.ProdutosService = ProdutosService;
exports.ProdutosService = ProdutosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProdutosService);
//# sourceMappingURL=produtos.service.js.map