import { Type } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdatePopUpDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  estadoPopUp: boolean;
}
