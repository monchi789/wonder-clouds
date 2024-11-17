import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDocumentationDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    type: 'string',
    minLength: 3,
    example: 'juanperez',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  usuario: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: 'string',
    format: 'password',
    minLength: 6,
    example: 'Contraseña123',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasena: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: 'string',
    format: 'email',
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    type: 'string',
    minLength: 3,
    example: 'Juan',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: 'Apellido paterno del usuario',
    type: 'string',
    minLength: 3,
    example: 'Pérez',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  apellidoPaterno: string;

  @ApiProperty({
    description: 'Apellido materno del usuario',
    type: 'string',
    minLength: 3,
    example: 'López',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  apellidoMaterno: string;
}
