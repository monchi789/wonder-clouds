import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  usuario: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  apellidoPaterno: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  apellidoMaterno: string;
}
