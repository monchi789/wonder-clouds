import { IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';

export class UpdatePopUpDto {
  @IsOptional()
  @IsBoolean()
  estadoPopUp: boolean;

  @IsString()
  @IsOptional()
  @MinLength(5)
  imagenPopUp: string;
}
