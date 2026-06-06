import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { NovoProdutoDto } from './produtos.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private service: ProdutosService) {}

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number) {
    return this.service.buscar(id);
  }

  @Post()
  criar(@Body() dto: NovoProdutoDto) {
    return this.service.criar(dto);
  }

  @Put(':id')
  atualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: NovoProdutoDto) {
    return this.service.atualizar(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.service.remover(id);
  }
}
