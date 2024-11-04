import { Type } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateSliderDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  estadoSlider: boolean;
}
