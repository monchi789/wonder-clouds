import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePublicacionDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  titulo: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  contenido: string;

  @IsString()
  @IsOptional()
  portada: string;

  @IsDate()
  @IsOptional()
  fechaPublicacion: Date;

  @IsString()
  @IsOptional()
  categoriaPublicacion: string;
}
