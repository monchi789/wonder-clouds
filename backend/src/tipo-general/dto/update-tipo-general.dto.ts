import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTipoGeneralDto {
  @IsOptional()
  @IsString()
  @MaxLength(5)
  codigo: string;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  tipo: string;

  @IsOptional()
  @IsBoolean()
  activo: boolean;
}
