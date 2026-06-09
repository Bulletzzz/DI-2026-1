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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const ia_service_1 = require("../ia/ia.service");
let DashboardService = class DashboardService {
    prisma;
    ia;
    constructor(prisma, ia) {
        this.prisma = prisma;
        this.ia = ia;
    }
    async resumo() {
        const totalClientes = await this.prisma.cliente.count();
        const pedidos = await this.prisma.pedido.findMany({ select: { total: true } });
        const receitaTotal = pedidos.reduce((soma, p) => soma + p.total, 0);
        const ticketMedio = totalClientes > 0 ? receitaTotal / totalClientes : 0;
        const scores = await this.ia.listarScores().catch(() => []);
        const clientesRiscoAlto = scores.filter((s) => s.riscoChurn === 'alto').length;
        const taxaChurn = totalClientes > 0 ? (clientesRiscoAlto / totalClientes) * 100 : 0;
        return { totalClientes, receitaTotal, ticketMedio, taxaChurn, clientesRiscoAlto };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ia_service_1.IaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map