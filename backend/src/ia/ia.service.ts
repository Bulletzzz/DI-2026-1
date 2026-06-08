import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';

const IA_URL = process.env.IA_API_URL ?? 'http://localhost:5000';

@Injectable()
export class IaService {
  async listarScores() {
    try {
      const res = await fetch(`${IA_URL}/scores`);
      if (!res.ok) throw new Error();
      return res.json();
    } catch {
      throw new ServiceUnavailableException('API de IA indisponível');
    }
  }

  async buscarScore(clienteId: number) {
    try {
      const res = await fetch(`${IA_URL}/scores/${clienteId}`);
      if (res.status === 404) throw new NotFoundException('Score não encontrado');
      if (!res.ok) throw new Error();
      return res.json();
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new ServiceUnavailableException('API de IA indisponível');
    }
  }

  async resumoChurn() {
    const scores = await this.listarScores();

    const alto = scores.filter((s: any) => s.riscoChurn === 'alto').length;
    const medio = scores.filter((s: any) => s.riscoChurn === 'medio').length;
    const baixo = scores.filter((s: any) => s.riscoChurn === 'baixo').length;

    const distribuicaoScoring = [
      { faixa: '0 – 25', quantidade: scores.filter((s: any) => s.scoring <= 25).length },
      { faixa: '26 – 50', quantidade: scores.filter((s: any) => s.scoring > 25 && s.scoring <= 50).length },
      { faixa: '51 – 75', quantidade: scores.filter((s: any) => s.scoring > 50 && s.scoring <= 75).length },
      { faixa: '76 – 100', quantidade: scores.filter((s: any) => s.scoring > 75).length },
    ];

    return { alto, medio, baixo, distribuicaoScoring };
  }
}
