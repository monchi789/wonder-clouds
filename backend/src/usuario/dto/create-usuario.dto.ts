import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @MinLength(6)
  contrasena: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  usuario: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  rol?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  apellidoPaterno: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  apellidoMaterno: string;
}
