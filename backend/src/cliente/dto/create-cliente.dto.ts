import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  apellidoMaterno: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nroDocumento: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  rubro: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  celular: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  correo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  tipoDocumento: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  tipoCliente: string;
}
