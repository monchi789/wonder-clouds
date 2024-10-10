import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  apellidoMaterno: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nroDocumento: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  rubro: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  celular: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  correo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  tipoDocumento: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  tipoCliente: string;
}
