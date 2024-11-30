import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class ServicioDocumentationDto {
  @ApiProperty({
    description: 'Nombre del servicio',
    type: 'string',
    example: 'Diseño Web Personalizado',
  })
  @IsString()
  @IsNotEmpty()
  nombreServicio: string;

  @ApiProperty({
    description: 'Ruta del logo del servicio',
    type: 'string',
    format: 'binary',
    example: '/uploads/logos/logo-diseño-web.jpg',
  })
  @IsString()
  @IsNotEmpty()
  logoServicio: string;

  @ApiProperty({
    description: 'Precio del servicio',
    type: 'number',
    example: 299.99,
  })
  @IsNumber()
  @IsNotEmpty()
  precioServicio: number;

  @ApiProperty({
    description: 'Descripción detallada del servicio',
    type: 'string',
    example:
      'Incluye diseño web profesional y optimización para motores de búsqueda.',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Lista de fotos del servicio (rutas)',
    type: 'array',
    items: { type: 'string', format: 'binary' },
    example: ['/uploads/servicios/foto1.jpg', '/uploads/servicios/foto2.jpg'],
  })
  @IsArray()
  @IsOptional()
  fotoServicio: string[];

  @ApiProperty({
    description: 'Palabras clave asociadas al servicio',
    type: 'array',
    items: { type: 'string' },
    example: ['diseño', 'web', 'SEO', 'profesional'],
  })
  @IsArray()
  @IsOptional()
  palabrasClave: string[];

  @ApiProperty({
    description: 'Descripción corta del servicio',
    type: 'string',
    example: 'Diseño web profesional y optimizado.',
  })
  @IsString()
  @IsNotEmpty()
  descripcionCorta: string;
}
