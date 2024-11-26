import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InstagramService {
  private readonly apiBaseUrl: string;
  private accessToken: string;
  private businessAccountId: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl = `https://graph.facebook.com/${this.configService.get('INSTAGRAM_API_VERSION')}`;
    this.accessToken = this.configService.get('INSTAGRAM_TOKEN');
    this.businessAccountId = this.configService.get(
      'INSTAGRAM_BUSINESS_ACCOUNT_ID',
    );
  }

  // Renovar token de acceso
  async refreshToken(): Promise<string> {
    try {
      const url = `https://graph.facebook.com/oauth/access_token`;
      const params = {
        grant_type: 'ig_exchange_token',
        client_id: 'YOUR_APP_ID',
        client_secret: 'YOUR_APP_SECRET',
        access_token: this.accessToken,
      };

      const response = await lastValueFrom(
        this.httpService.get(url, { params }),
      );
      this.accessToken = response.data.access_token;

      console.log('Token renovado correctamente');
      return this.accessToken;
    } catch (error) {
      throw new HttpException(
        `Error al renovar el token: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Publicar contenido en Instagram
  async publishPost(imageUrl: string, caption: string): Promise<any> {
    const endpoint = `${this.apiBaseUrl}/${this.businessAccountId}/media`;
    const publishEndpoint = `${this.apiBaseUrl}/${this.businessAccountId}/media_publish`;

    try {
      // Subir el contenido como contenedor
      const uploadResponse = await lastValueFrom(
        this.httpService.post(endpoint, {
          image_url: imageUrl,
          caption,
          access_token: this.accessToken,
        }),
      );

      const mediaId = uploadResponse.data.id;

      // Publicar el contenedor
      const publishResponse = await lastValueFrom(
        this.httpService.post(publishEndpoint, {
          creation_id: mediaId,
          access_token: this.accessToken,
        }),
      );

      return publishResponse.data;
    } catch (error) {
      throw new HttpException(
        `Error al publicar: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener publicaciones del perfil
  async getPosts(): Promise<any> {
    const endpoint = `${this.apiBaseUrl}/${this.businessAccountId}/media?fields=id,caption,media_type,media_url,timestamp&access_token=${this.accessToken}`;

    try {
      const response = await lastValueFrom(this.httpService.get(endpoint));
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error al obtener publicaciones: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Filtrar publicaciones por hashtag
  async filterPostsByHashtag(hashtag: string): Promise<any> {
    const posts = await this.getPosts();

    const filteredPosts = posts.data.filter((post) =>
      post.caption?.includes(`#${hashtag}`),
    );

    return filteredPosts;
  }
}
