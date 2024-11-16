import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroServicioDto {
  @IsOptional()
  @IsString()
  nombreServicio?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  precioMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  precioMax?: number;
}
