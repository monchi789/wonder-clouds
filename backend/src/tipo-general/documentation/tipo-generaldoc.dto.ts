import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { Tipo } from 'src/common/enums/tipo.enum';

export class TipoGeneralDocumentationDto {
  @ApiProperty({
    description: 'Código único del Tipo General (máximo 5 caracteres)',
    type: 'string',
    maxLength: 5,
    example: 'TG001',
  })
  @IsString()
  @MaxLength(5)
  codigo: string;

  @ApiProperty({
    description: 'Nombre único del Tipo General',
    type: 'string',
    example: 'Tipo Especial',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción del Tipo General',
    type: 'string',
    example: 'Este es un tipo general utilizado para clasificación.',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Tipo del registro',
    enum: Tipo,
    default: Tipo.GENERAL,
  })
  @IsEnum(Tipo)
  tipo: string;

  @ApiProperty({
    description: 'Estado del registro (activo o inactivo)',
    type: 'boolean',
    example: true,
  })
  @IsBoolean()
  activo: boolean;
}
