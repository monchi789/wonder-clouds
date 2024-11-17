import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Rol } from '../../common/enums/rol.enum';

export class UsuarioDocumentationDto {
  @ApiProperty({
    description: 'Nombre de usuario único',
    type: 'string',
    example: 'juanperez',
  })
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: 'string',
    format: 'password',
    example: 'ContraseñaSegura123',
  })
  @IsString()
  @IsNotEmpty()
  contrasena: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    type: 'string',
    format: 'email',
    example: 'usuario@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Rol del usuario',
    enum: Rol,
    default: Rol.USUARIO,
    example: Rol.ADMIN,
  })
  @IsEnum(Rol)
  @IsOptional()
  rol?: Rol;

  @ApiProperty({
    description: 'Nombre del usuario',
    type: 'string',
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Apellido paterno del usuario',
    type: 'string',
    example: 'Pérez',
  })
  @IsString()
  @IsNotEmpty()
  apellidoPaterno: string;

  @ApiProperty({
    description: 'Apellido materno del usuario',
    type: 'string',
    example: 'López',
  })
  @IsString()
  @IsNotEmpty()
  apellidoMaterno: string;
}
