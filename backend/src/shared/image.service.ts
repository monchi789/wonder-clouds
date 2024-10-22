import { Injectable, BadRequestException } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { Express } from 'express';

@Injectable()
export class ImageService {
  // Método para subir múltiples imágenes y devolver sus rutas
  async uploadImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes');
    }

    // Genera las rutas de las imágenes
    const imagePaths = files.map(
      (file) => `/uploads/${folder}/${file.filename}`,
    );
    return imagePaths;
  }

  // Método para eliminar imágenes
  async deleteImages(imagePaths: string[]): Promise<void> {
    for (const path of imagePaths) {
      try {
        await unlink(`.${path}`); // Elimina la imagen del sistema de archivos
      } catch {
        throw new BadRequestException(`Error al eliminar la imagen: ${path}`);
      }
    }
  }
}
