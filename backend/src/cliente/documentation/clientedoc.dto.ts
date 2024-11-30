import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ClienteDocumentationDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    type: 'string',
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Apellido paterno del cliente',
    type: 'string',
    example: 'Pérez',
  })
  @IsString()
  @IsNotEmpty()
  apellidoPaterno: string;

  @ApiProperty({
    description: 'Apellido materno del cliente',
    type: 'string',
    example: 'López',
  })
  @IsString()
  @IsNotEmpty()
  apellidoMaterno: string;

  @ApiProperty({
    description: 'Número de documento del cliente',
    type: 'string',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  nroDocumento: string;

  @ApiProperty({
    description: 'Rubro del cliente',
    type: 'string',
    example: 'Tecnología',
  })
  @IsString()
  @IsOptional()
  rubro?: string;

  @ApiProperty({
    description: 'Número de celular del cliente',
    type: 'string',
    example: '987654321',
  })
  @IsString()
  @IsNotEmpty()
  celular: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    type: 'string',
    format: 'email',
    example: 'cliente@example.com',
  })
  @IsString()
  @IsNotEmpty()
  correo: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    type: 'string',
    example: 'Av. Principal 123',
  })
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty({
    description: 'Tipo de documento del cliente',
    type: 'string',
    example: 'DNI',
  })
  @IsString()
  @IsNotEmpty()
  tipoDocumento: string;

  @ApiProperty({
    description: 'Tipo de cliente',
    type: 'string',
    example: 'Corporativo',
  })
  @IsString()
  @IsNotEmpty()
  tipoCliente: string;
}
