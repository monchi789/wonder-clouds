import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsDate,
  IsUUID,
} from 'class-validator';

export class UpdateTrabajoDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  nombreTrabajo?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  descripcionTrabajo?: string;

  @IsOptional()
  @IsBoolean()
  visibilidadTrabajo?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaTrabajo?: Date;

  @IsUUID()
  @IsOptional()
  idCliente?: string;

  @IsUUID()
  @IsOptional()
  idServicio?: string;
}
