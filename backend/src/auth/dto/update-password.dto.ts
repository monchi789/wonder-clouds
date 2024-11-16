import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  usuario?: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasena: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  nuevaContrasena: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  nombre?: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  apellidoPaterno?: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  apellidoMaterno?: string;
}
