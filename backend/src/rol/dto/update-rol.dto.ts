import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePermisoDto } from 'src/permiso/dto/create-permiso.dto';

export class UpdateRolDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  nombreRol: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermisoDto)
  permisos: CreatePermisoDto[];
}
