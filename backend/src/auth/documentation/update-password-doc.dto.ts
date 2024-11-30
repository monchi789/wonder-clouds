import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDocumentationDto {
  @ApiProperty({
    description: 'Nombre de usuario (opcional)',
    type: 'string',
    minLength: 3,
    example: 'juanperez',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  usuario?: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: 'string',
    format: 'email',
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña actual del usuario',
    type: 'string',
    format: 'password',
    minLength: 6,
    example: 'ContraseñaActual123',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasena: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    type: 'string',
    format: 'password',
    minLength: 6,
    example: 'NuevaContraseña123',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  nuevaContrasena: string;
}
