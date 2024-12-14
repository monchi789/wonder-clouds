import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InstagramService } from './isntagram.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { FilterPostsDto } from './dto/filter-posts.dto';

@ApiTags('Instagram')
@ApiBearerAuth()
@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @ApiOperation({ summary: 'Renovar el token de acceso' })
  @Get('refresh-token')
  async refreshToken() {
    return this.instagramService.refreshToken();
  }

  @ApiOperation({ summary: 'Publicar contenido en Instagram' })
  @Post('publish')
  async publishPost(@Body() createPostDto: CreatePostDto) {
    const { imageUrl, caption } = createPostDto;
    return this.instagramService.publishPost(imageUrl, caption);
  }

  @ApiOperation({ summary: 'Obtener todas las publicaciones' })
  @Get('posts')
  async getPosts() {
    return this.instagramService.getPosts();
  }

  @ApiOperation({ summary: 'Filtrar publicaciones por hashtag' })
  @Get('filter')
  async filterPostsByHashtag(@Query() filterPostsDto: FilterPostsDto) {
    const { hashtag } = filterPostsDto;
    return this.instagramService.filterPostsByHashtag(hashtag);
  }
}
