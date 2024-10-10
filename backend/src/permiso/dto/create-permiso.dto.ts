import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermisoDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  nombrePermiso: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  descripcion?: string;
}
