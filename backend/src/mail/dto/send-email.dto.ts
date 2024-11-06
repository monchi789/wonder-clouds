import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactFormDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  correo: string;

  @IsOptional()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsString()
  mensaje: string;
}
