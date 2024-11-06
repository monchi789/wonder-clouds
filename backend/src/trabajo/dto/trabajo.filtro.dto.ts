import { IsOptional, IsString, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroTrabajoDto {
  @IsOptional()
  @IsString()
  nombreTrabajo?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaDesde?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaHasta?: Date;

  @IsOptional()
  @IsString()
  tipoTrabajo?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  visibilidadTrabajo?: boolean;
}
