import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsBoolean } from 'class-validator';

export class CreatePopUpDto {
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  estadoPopUp: boolean;
}
