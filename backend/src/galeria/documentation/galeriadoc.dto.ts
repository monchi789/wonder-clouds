import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GaleriaDocumentationDto {
  @ApiProperty({
    description: 'Estado de la galería (activo o inactivo)',
    type: 'boolean',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  estadoGaleria: boolean;

  @ApiProperty({
    description: 'Imágenes asociadas a la galería',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    example: ['imagen1.jpg', 'imagen2.jpg'],
  })
  @IsOptional()
  imagenes: Express.Multer.File[];

  @ApiProperty({
    description: 'Título de la galería',
    type: 'string',
    example: 'Exposición de Arte Moderno',
  })
  @IsString()
  @IsNotEmpty()
  tituloGaleria: string;

  @ApiProperty({
    description: 'Descripción de la galería',
    type: 'string',
    example: 'Una colección única de arte contemporáneo.',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
