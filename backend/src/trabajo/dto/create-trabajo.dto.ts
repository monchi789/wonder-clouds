import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsDate,
  IsUUID,
} from 'class-validator';

export class CreateTrabajoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nombreTrabajo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  descripcionTrabajo: string;

  @IsNotEmpty()
  @IsBoolean()
  visibilidadTrabajo: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaTrabajo: Date;

  @IsUUID()
  @IsNotEmpty()
  idCliente: string;

  @IsUUID()
  @IsNotEmpty()
  idServicio: string;
}
