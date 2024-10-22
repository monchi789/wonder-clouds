import { Type } from 'class-transformer';
import { IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';

export class UpdatePopUpDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  estadoPopUp: boolean;
}
