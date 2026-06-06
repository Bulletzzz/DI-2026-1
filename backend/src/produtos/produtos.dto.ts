import { IsNotEmpty, IsNumber, IsInt, Min, IsOptional } from 'class-validator';

export class NovoProdutoDto {
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @Min(0.01)
  preco: number;

  @IsInt()
  @Min(0)
  estoque: number;

  @IsOptional()
  @IsInt()
  categoriaId: number | null;
}
