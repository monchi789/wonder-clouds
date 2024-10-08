import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTipoGeneralDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsBoolean()
  activo: boolean;
}
