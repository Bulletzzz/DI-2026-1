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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatoriosController = void 0;
const common_1 = require("@nestjs/common");
const relatorios_service_1 = require("./relatorios.service");
let RelatoriosController = class RelatoriosController {
    service;
    constructor(service) {
        this.service = service;
    }
    vendasPorMes() {
        return this.service.vendasPorMes();
    }
    vendasPorCidade() {
        return this.service.vendasPorCidade();
    }
    receitaPorProduto() {
        return this.service.receitaPorProduto();
    }
    topClientes(limite = '5') {
        return this.service.topClientes(parseInt(limite));
    }
    topProdutos(limite = '5') {
        return this.service.topProdutos(parseInt(limite));
    }
    pedidosRecentes(limite = '5') {
        return this.service.pedidosRecentes(parseInt(limite));
    }
    projecaoReceita() {
        return this.service.projecaoReceita();
    }
};
exports.RelatoriosController = RelatoriosController;
__decorate([
    (0, common_1.Get)('vendas-por-mes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelatoriosController.prototype, "vendasPorMes", null);
__decorate([
    (0, common_1.Get)('vendas-por-cidade'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelatoriosController.prototype, "vendasPorCidade", null);
__decorate([
    (0, common_1.Get)('receita-por-produto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelatoriosController.prototype, "receitaPorProduto", null);
__decorate([
    (0, common_1.Get)('top-clientes'),
    __param(0, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RelatoriosController.prototype, "topClientes", null);
__decorate([
    (0, common_1.Get)('top-produtos'),
    __param(0, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RelatoriosController.prototype, "topProdutos", null);
__decorate([
    (0, common_1.Get)('pedidos-recentes'),
    __param(0, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RelatoriosController.prototype, "pedidosRecentes", null);
__decorate([
    (0, common_1.Get)('projecao-receita'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelatoriosController.prototype, "projecaoReceita", null);
exports.RelatoriosController = RelatoriosController = __decorate([
    (0, common_1.Controller)('relatorios'),
    __metadata("design:paramtypes", [relatorios_service_1.RelatoriosService])
], RelatoriosController);
//# sourceMappingURL=relatorios.controller.js.map