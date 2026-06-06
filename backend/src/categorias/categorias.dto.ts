import { IsNotEmpty } from 'class-validator';

export class NovaCategoriaDto {
  @IsNotEmpty()
  nome: string;
}
