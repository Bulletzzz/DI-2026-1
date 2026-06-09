"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IaService = void 0;
const common_1 = require("@nestjs/common");
const IA_URL = process.env.IA_API_URL ?? 'http://localhost:5000';
let IaService = class IaService {
    async listarScores() {
        try {
            const res = await fetch(`${IA_URL}/scores`);
            if (!res.ok)
                throw new Error();
            return res.json();
        }
        catch {
            throw new common_1.ServiceUnavailableException('API de IA indisponível');
        }
    }
    async buscarScore(clienteId) {
        try {
            const res = await fetch(`${IA_URL}/scores/${clienteId}`);
            if (res.status === 404)
                throw new common_1.NotFoundException('Score não encontrado');
            if (!res.ok)
                throw new Error();
            return res.json();
        }
        catch (e) {
            if (e instanceof common_1.NotFoundException)
                throw e;
            throw new common_1.ServiceUnavailableException('API de IA indisponível');
        }
    }
    async resumoChurn() {
        const scores = await this.listarScores();
        const alto = scores.filter((s) => s.riscoChurn === 'alto').length;
        const medio = scores.filter((s) => s.riscoChurn === 'medio').length;
        const baixo = scores.filter((s) => s.riscoChurn === 'baixo').length;
        const distribuicaoScoring = [
            { faixa: '0 – 25', quantidade: scores.filter((s) => s.scoring <= 25).length },
            { faixa: '26 – 50', quantidade: scores.filter((s) => s.scoring > 25 && s.scoring <= 50).length },
            { faixa: '51 – 75', quantidade: scores.filter((s) => s.scoring > 50 && s.scoring <= 75).length },
            { faixa: '76 – 100', quantidade: scores.filter((s) => s.scoring > 75).length },
        ];
        return { alto, medio, baixo, distribuicaoScoring };
    }
};
exports.IaService = IaService;
exports.IaService = IaService = __decorate([
    (0, common_1.Injectable)()
], IaService);
//# sourceMappingURL=ia.service.js.map