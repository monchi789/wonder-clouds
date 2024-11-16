import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: 'Apellido paterno del cliente',
    example: 'Pérez',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  apellidoPaterno: string;

  @ApiProperty({
    description: 'Apellido materno del cliente',
    example: 'Gómez',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  apellidoMaterno: string;

  @ApiProperty({
    description: 'Número de documento de identidad del cliente',
    example: '12345678',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nroDocumento: string;

  @ApiProperty({
    description: 'Rubro al que se dedica el cliente',
    example: 'Tecnología',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  rubro: string;

  @ApiProperty({
    description: 'Número de celular del cliente',
    example: '987654321',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  celular: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@example.com',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  correo: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    example: 'Av. Siempre Viva 123',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  direccion: string;

  @ApiProperty({
    description: 'Tipo de documento del cliente',
    example: 'DNI',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  tipoDocumento: string;

  @ApiProperty({
    description: 'Tipo de cliente',
    example: 'Regular',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  tipoCliente: string;
}
