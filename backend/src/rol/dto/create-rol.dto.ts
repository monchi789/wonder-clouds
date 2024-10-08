import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  nombreRol: string;
}
