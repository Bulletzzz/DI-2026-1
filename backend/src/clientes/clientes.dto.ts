import { IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsBoolean()
  temPlano?: boolean;
}
