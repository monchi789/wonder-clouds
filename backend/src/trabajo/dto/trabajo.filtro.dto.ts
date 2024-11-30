import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsUUID,
} from 'class-validator';
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
  @IsUUID()
  idServicio?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  visibilidadTrabajo?: boolean;
}
