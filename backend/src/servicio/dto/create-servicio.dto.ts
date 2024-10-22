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

  @IsNotEmpty()
  @IsDecimal()
  precioServio: number;
}
