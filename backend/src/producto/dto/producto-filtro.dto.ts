import { Type } from 'class-transformer';
import { IsOptional, IsBoolean, IsString, IsNumber } from 'class-validator';

export class FiltroProductoDto {
  @IsOptional()
  @IsString()
  nombreProducto?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precioMinimo?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precioMaximo?: number;

  @IsOptional()
  @IsString()
  categoriaProducto?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  estadoActivo?: boolean;
}
