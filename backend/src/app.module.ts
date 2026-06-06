import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [ClientesModule, CategoriasModule, ProdutosModule, PedidosModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}



