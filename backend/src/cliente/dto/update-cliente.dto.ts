import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateClienteDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  apellidoPaterno: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  apellidoMaterno: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  nroDocumento: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  rubro: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  celular: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  correo: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  direccion: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  tipoDocumento: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  tipoCliente: string;
}
