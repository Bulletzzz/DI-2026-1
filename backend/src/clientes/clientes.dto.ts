import { IsEmail, IsNotEmpty } from 'class-validator';

export class NovoClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  pais: string;
}
