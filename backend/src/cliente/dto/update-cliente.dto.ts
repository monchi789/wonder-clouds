import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClienteDto {
  @ApiPropertyOptional({
    description: 'Nombre del cliente',
    example: 'Carlos',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  nombre: string;

  @ApiPropertyOptional({
    description: 'Apellido paterno del cliente',
    example: 'Perez',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  apellidoPaterno: string;

  @ApiPropertyOptional({
    description: 'Apellido materno del cliente',
    example: 'Gomez',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  apellidoMaterno: string;

  @ApiPropertyOptional({
    description: 'Número de documento del cliente',
    example: '12345678',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  nroDocumento: string;

  @ApiPropertyOptional({
    description: 'Rubro del cliente',
    example: 'Tecnología',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  rubro: string;

  @ApiPropertyOptional({
    description: 'Número de celular del cliente',
    example: '987654321',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  celular: string;

  @ApiPropertyOptional({
    description: 'Correo del cliente',
    example: 'cliente@correo.com',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  correo: string;

  @ApiPropertyOptional({
    description: 'Dirección del cliente',
    example: 'Calle Falsa 123',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  direccion: string;

  @ApiPropertyOptional({
    description: 'Tipo de documento del cliente',
    example: 'DNI',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  tipoDocumento: string;

  @ApiPropertyOptional({
    description: 'Tipo de cliente',
    example: 'Corporativo',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  tipoCliente: string;
}
