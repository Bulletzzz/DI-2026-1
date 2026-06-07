import { Controller, Get, Query } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private service: RelatoriosService) {}

  @Get('vendas-por-mes')
  vendasPorMes() {
    return this.service.vendasPorMes();
  }

  @Get('vendas-por-cidade')
  vendasPorCidade() {
    return this.service.vendasPorCidade();
  }

  @Get('receita-por-produto')
  receitaPorProduto() {
    return this.service.receitaPorProduto();
  }

  @Get('top-clientes')
  topClientes(@Query('limite') limite = '5') {
    return this.service.topClientes(parseInt(limite));
  }

  @Get('top-produtos')
  topProdutos(@Query('limite') limite = '5') {
    return this.service.topProdutos(parseInt(limite));
  }

  @Get('pedidos-recentes')
  pedidosRecentes(@Query('limite') limite = '5') {
    return this.service.pedidosRecentes(parseInt(limite));
  }

  @Get('projecao-receita')
  projecaoReceita() {
    return this.service.projecaoReceita();
  }
}
