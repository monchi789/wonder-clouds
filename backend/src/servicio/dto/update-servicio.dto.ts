import { IsDecimal, IsOptional, IsString, MinLength } from 'class-validator';

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
}
