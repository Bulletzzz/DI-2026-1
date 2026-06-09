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
exports.IaController = void 0;
const common_1 = require("@nestjs/common");
const ia_service_1 = require("./ia.service");
let IaController = class IaController {
    service;
    constructor(service) {
        this.service = service;
    }
    listarScores() {
        return this.service.listarScores();
    }
    buscarScore(clienteId) {
        return this.service.buscarScore(clienteId);
    }
    resumoChurn() {
        return this.service.resumoChurn();
    }
};
exports.IaController = IaController;
__decorate([
    (0, common_1.Get)('scores'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IaController.prototype, "listarScores", null);
__decorate([
    (0, common_1.Get)('scores/:clienteId'),
    __param(0, (0, common_1.Param)('clienteId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IaController.prototype, "buscarScore", null);
__decorate([
    (0, common_1.Get)('resumo-churn'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IaController.prototype, "resumoChurn", null);
exports.IaController = IaController = __decorate([
    (0, common_1.Controller)('ia'),
    __metadata("design:paramtypes", [ia_service_1.IaService])
], IaController);
//# sourceMappingURL=ia.controller.js.map