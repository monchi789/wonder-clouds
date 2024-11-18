import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDocumentationDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: 'string',
    format: 'email',
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;

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
}
