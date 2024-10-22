import { Module } from '@nestjs/common';
import { ImageService } from './image.service'; // Importa el servicio de imagen

@Module({
  providers: [ImageService],
  exports: [ImageService], // Exporta el servicio de imagen
})
export class SharedModule {}
