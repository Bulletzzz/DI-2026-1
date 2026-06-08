import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ia')
export class IaController {
  constructor(private service: IaService) {}

  @Get('scores')
  listarScores() {
    return this.service.listarScores();
  }

  @Get('scores/:clienteId')
  buscarScore(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.service.buscarScore(clienteId);
  }

  @Get('resumo-churn')
  resumoChurn() {
    return this.service.resumoChurn();
  }
}
