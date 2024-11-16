import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTipoGeneralDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  tipo: string;

  @IsNotEmpty()
  @IsBoolean()
  activo: boolean;
}
