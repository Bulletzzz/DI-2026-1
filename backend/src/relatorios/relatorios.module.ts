import { Module } from '@nestjs/common';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosService } from './relatorios.service';
import { PrismaService } from '../prisma.service';
import { IaModule } from '../ia/ia.module';

@Module({
  imports: [IaModule],
  controllers: [RelatoriosController],
  providers: [RelatoriosService, PrismaService],
})
export class RelatoriosModule {}
