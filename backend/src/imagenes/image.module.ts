import { Module } from '@nestjs/common';
import { ImageService } from './subir_image.service'; // Importa el servicio de imagen

@Module({
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
