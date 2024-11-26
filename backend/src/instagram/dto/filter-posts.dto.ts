import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FilterPostsDto {
  @ApiProperty({
    description: 'Hashtag para filtrar las publicaciones',
    example: 'rock',
  })
  @IsString()
  hashtag: string;
}
