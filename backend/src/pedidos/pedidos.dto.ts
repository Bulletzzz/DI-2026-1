import { IsInt, Min, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemPedidoDto {
  @IsInt()
  produtoId: number;

  @IsInt()
  @Min(1)
  quantidade: number;
}

export class NovoPedidoDto {
  @IsInt()
  clienteId: number;

  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  @ArrayMinSize(1)
  itens: ItemPedidoDto[];
}
