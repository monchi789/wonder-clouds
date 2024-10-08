import { IsNotEmpty, IsString, MinLength, IsBoolean } from 'class-validator';

export class UpdateSliderDto {
  @IsNotEmpty()
  @IsBoolean()
  estadoSlider: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  imagen: string;
}
