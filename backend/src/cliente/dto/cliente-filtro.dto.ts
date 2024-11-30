import { IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroClienteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellidoPaterno?: string;

  @IsOptional()
  @IsString()
  nroDocumento?: string;

  @IsOptional()
  @IsString()
  rubro?: string;

  @IsOptional()
  @IsString()
  tipoCliente?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaDesde?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaHasta?: Date;
}
