import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePublicacionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Type(() => String)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Type(() => String)
  contenido: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  categoriaPublicacion: string;
}
