import { Injectable, BadRequestException } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { extname } from 'path';

@Injectable()
export class ImageService {
  async uploadImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes');
    }

    const imagePaths = files.map((file) => {
      const uniqueName = this.generateUniqueName(file.originalname);
      const fullPath = `/uploads/${folder}/${uniqueName}`;
      return fullPath;
    });

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

  private generateUniqueName(originalName: string): string {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}${extname(originalName)}`;
  }
}
