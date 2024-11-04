import { Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePublicacionDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @Type(() => String)
  titulo: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  autor?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  @Type(() => String)
  contenido: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  categoriaPublicacion: string;
}
