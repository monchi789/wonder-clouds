import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePublicacionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  contenido: string;

  @IsString()
  portada: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaPublicacion: Date;

  @IsString()
  categoriaPublicacion: string;
}
