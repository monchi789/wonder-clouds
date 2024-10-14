import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateSliderDto {
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  estadoSlider: boolean;
}
