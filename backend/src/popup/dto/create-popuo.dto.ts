import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreatePopUpDto {
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  estadoPopUp: boolean;
}
