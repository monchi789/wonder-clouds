import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(6)
  contrasena?: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  usuario?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  @MinLength(3)
  rol?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  apellidoPaterno: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  apellidoMaterno: string;
}
