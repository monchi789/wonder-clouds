import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'URL de la imagen que se publicará en Instagram',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'Texto del caption de la publicación',
    example: '¡Hola, mundo! #InstagramAPI',
  })
  @IsString()
  caption: string;
}
