import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsDate } from 'class-validator';

export class PublicacionDocumentationDto {
  @ApiProperty({
    description: 'Título de la publicación',
    type: 'string',
    example: 'El impacto de la tecnología en la educación',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'Autor de la publicación',
    type: 'string',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  autor: string;

  @ApiProperty({
    description: 'Contenido de la publicación',
    type: 'string',
    example:
      'Esta publicación explora cómo la tecnología ha transformado la educación...',
  })
  @IsString()
  @IsNotEmpty()
  contenido: string;

  @ApiProperty({
    description: 'Ruta de la imagen de portada de la publicación',
    type: 'string',
    format: 'binary',
    example: '/uploads/portadas/imagen1.jpg',
  })
  @IsString()
  @IsOptional()
  portada?: string;

  @ApiProperty({
    description: 'Fecha de publicación',
    type: 'string',
    format: 'date',
    example: '2023-11-17',
  })
  @IsDate()
  @IsOptional()
  fechaPublicacion?: Date;

  @ApiProperty({
    description: 'Categoría de la publicación',
    type: 'string',
    example: 'Tecnología',
  })
  @IsString()
  @IsNotEmpty()
  categoriaPublicacion: string;
}
