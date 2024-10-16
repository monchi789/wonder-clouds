import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePublicacionDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @Type(() => String)
  titulo: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  @Type(() => String)
  contenido: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaPublicacion: Date;

  @IsString()
  @IsOptional()
  @Type(() => String)
  categoriaPublicacion: string;
}
