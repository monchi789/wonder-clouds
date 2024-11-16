import { Type } from 'class-transformer';
import { IsOptional, IsBoolean, IsString, MinLength } from 'class-validator';

export class UpdateGaleriaDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  estadoSlider: boolean;

  @IsOptional()
  @IsString()
  @MinLength(1)
  tituloGaleria: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  descripcion: string;
}
