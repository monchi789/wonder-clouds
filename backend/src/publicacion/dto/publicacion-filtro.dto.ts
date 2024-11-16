import { IsOptional, IsString, IsDate } from 'class-validator';

export class FiltrosPublicacionDto {
  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  autor?: string;

  @IsOptional()
  @IsDate()
  fechaDesde?: Date;

  @IsOptional()
  @IsDate()
  fechaHasta?: Date;

  @IsOptional()
  @IsString()
  busqueda?: string;
}
