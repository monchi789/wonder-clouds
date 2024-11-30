import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UpdateUsuarioDto } from '../../usuario/dto/update-usuario.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePasswordDto extends PartialType(UpdateUsuarioDto) {
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
}
