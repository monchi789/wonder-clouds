import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateRolDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  nombreRol: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  permisos: { nombrePermiso: string }[];
}
