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
}
