import { IsDecimal, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateServicioDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nombreServicio: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  descripcion: string;

  @IsNotEmpty()
  @IsDecimal()
  precioServicio: number;
}
