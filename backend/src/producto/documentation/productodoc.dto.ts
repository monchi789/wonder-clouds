import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class ProductoDocumentationDto {
  @ApiProperty({
    description: 'Nombre del producto',
    type: 'string',
    example: 'Laptop Gamer',
  })
  @IsString()
  @IsNotEmpty()
  nombreProducto: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    type: 'string',
    example:
      'Laptop con procesador Intel i7, 16GB RAM, y tarjeta gráfica RTX 3060.',
  })
  @IsString()
  @IsNotEmpty()
  descripcionProducto: string;

  @ApiProperty({
    description: 'Precio del producto',
    type: 'number',
    example: 1500,
  })
  @IsNumber()
  @IsNotEmpty()
  precioPruducto: number;

  @ApiProperty({
    description: 'Lista de imágenes del producto',
    type: 'array',
    items: { type: 'string', format: 'binary' }, // Configurado para aceptar archivos
    example: [
      '/uploads/productos/imagen1.jpg',
      '/uploads/productos/imagen2.jpg',
    ],
  })
  @IsArray()
  @IsOptional()
  imagenProducto: string[];

  @ApiProperty({
    description: 'Categoría del producto',
    type: 'string',
    example: 'Electrónica',
  })
  @IsString()
  @IsNotEmpty()
  categoriaProducto: string;

  @ApiProperty({
    description: 'Estado del producto (activo o inactivo)',
    type: 'boolean',
    example: true,
  })
  @IsBoolean()
  estadoActivo: boolean;
}
