import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { NovoPedidoDto } from './pedidos.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private service: PedidosService) {}

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number) {
    return this.service.buscar(id);
  }

  @Post()
  criar(@Body() dto: NovoPedidoDto) {
    return this.service.criar(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.service.remover(id);
  }
}
