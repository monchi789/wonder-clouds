import { Type } from 'class-transformer';
import {
  IsOptional,
  IsBoolean,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombreProducto: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  descripcionProducto: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precioProducto: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  categoriaProducto: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  estadoActivo: boolean;
}
