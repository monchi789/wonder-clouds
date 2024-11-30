import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateServicioDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombreServicio: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  descripcion: string;

  @IsOptional()
  @IsDecimal()
  precioServicio: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  descripcionCorta: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  palabrasClave: string[];
}
