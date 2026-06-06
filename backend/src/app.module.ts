import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [ClientesModule, CategoriasModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

