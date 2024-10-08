import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsBoolean } from 'class-validator';

export class CreateSliderDto {
  @IsNotEmpty()
  @IsBoolean()
  estadoSlider: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  imagen: string;
}
