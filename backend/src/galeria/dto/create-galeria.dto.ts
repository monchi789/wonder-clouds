import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateGaleriaDto {
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  estadoGaleria: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  tituloGaleria: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  descripcion: string;
}
