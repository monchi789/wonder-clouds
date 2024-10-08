import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRolDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  nombreRol: string;
}
