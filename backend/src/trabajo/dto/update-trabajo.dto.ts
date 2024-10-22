import {
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class UpdateTrabajoDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  nombreTrabajo: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  descripcionTrabajo: string;

  @IsOptional()
  @IsBoolean()
  visibilidadTrabajo: boolean;

  @IsOptional()
  @IsDate()
  fechaTrabajo: Date;

  @IsString()
  @IsOptional()
  @MinLength(5)
  idCliente: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  tipoTrabajo: string;
}
