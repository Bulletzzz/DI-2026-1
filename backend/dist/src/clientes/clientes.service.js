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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
function formatarData(data) {
    return data.toISOString().split('T')[0];
}
function formatarCliente(cliente) {
    return { ...cliente, criadoEm: formatarData(cliente.criadoEm) };
}
let ClientesService = class ClientesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listar() {
        const clientes = await this.prisma.cliente.findMany();
        return clientes.map(formatarCliente);
    }
    async buscar(id) {
        const cliente = await this.prisma.cliente.findUnique({ where: { id } });
        if (!cliente)
            throw new common_1.NotFoundException('Cliente não encontrado');
        return formatarCliente(cliente);
    }
    async criar(dto) {
        const cliente = await this.prisma.cliente.create({ data: dto });
        return formatarCliente(cliente);
    }
    async atualizar(id, dto) {
        await this.buscar(id);
        const cliente = await this.prisma.cliente.update({ where: { id }, data: dto });
        return formatarCliente(cliente);
    }
    async remover(id) {
        await this.buscar(id);
        await this.prisma.cliente.delete({ where: { id } });
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map