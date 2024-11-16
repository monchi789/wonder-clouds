import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nombreProducto: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  descripcionProducto: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  precioProducto: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  categoriaProducto: string;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  descripcion: boolean;
}
