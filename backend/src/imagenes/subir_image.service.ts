import { Injectable, BadRequestException } from '@nestjs/common';
import { unlink } from 'fs/promises';

@Injectable()
export class ImageService {
  async uploadImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes');
    }

    const imagePaths = files.map(
      (file) => `/uploads/${folder}/${file.filename}`,
    );
    return imagePaths;
  }

  async deleteImages(imagePaths: string[]): Promise<void> {
    for (const path of imagePaths) {
      try {
        await unlink(`.${path}`); 
      } catch {
        throw new BadRequestException(`Error al eliminar la imagen: ${path}`);
      }
    }
  }
}
