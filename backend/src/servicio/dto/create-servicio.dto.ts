import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nombreServicio: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  descripcion: string;

  @IsNotEmpty()
  @IsDecimal()
  precioServicio: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  descripcionCorta: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  palabrasClave: string[];
}
