import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateClienteDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  nombre: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  apellidoPaterno: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  apellidoMaterno: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  nroDocumento: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  rubro: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  celular: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  correo: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  direccion: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  tipoDocumento: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  tipoCliente: string;
}
