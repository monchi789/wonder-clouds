import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nombreServicio: string;

  @IsOptional()
  @IsString()
  logoServicio: string;

  @IsNotEmpty()
  @IsDecimal()
  precioServio: number;
}
