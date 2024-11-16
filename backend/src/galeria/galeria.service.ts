import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { UpdateGaleriaDto } from './dto/update-galeria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Galeria } from './entities/galeria.entity';
import { Repository } from 'typeorm';
import { ImageService } from '../imagenes/subir_image.service';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectRepository(Galeria)
    private readonly galeriaRepository: Repository<Galeria>,
    private readonly imageService: ImageService,
  ) {}

  async create(
    createGaleriaDto: CreateGaleriaDto,
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes.');
    }

    // Subir imágenes usando el servicio de imágenes
    const imagePaths = await this.imageService.uploadImages(files, 'galeria');

    // Crear los datos de la galería sin incluir 'imagen' en el DTO
    const galeriaData = {
      ...createGaleriaDto,
      imagen: imagePaths, // Asigna las rutas de las imágenes directamente
    };

    const galeria = this.galeriaRepository.create(galeriaData);
    return await this.galeriaRepository.save(galeria);
  }

  async findAll() {
    return await this.galeriaRepository.find();
  }

  async findOne(idGaleria: string) {
    const galeria = await this.galeriaRepository.findOne({
      where: { idGaleria },
    });

    if (!galeria) {
      throw new NotFoundException(
        `Galeria con el id ${idGaleria} no encontrada.`,
      );
    }

    return galeria;
  }

  async update(
    idGaleria: string,
    updateGaleriaDto: UpdateGaleriaDto,
    files?: Express.Multer.File[],
  ) {
    const existingGaleria = await this.findOne(idGaleria);

    if (!existingGaleria) {
      throw new NotFoundException(
        `Galeria con el id ${idGaleria} no encontrada.`,
      );
    }

    let newImagePaths: string[] = existingGaleria.imagen;

    if (files && files.length > 0) {
      // Eliminar imágenes antiguas
      await this.imageService.deleteImages(existingGaleria.imagen);

      // Subir nuevas imágenes
      newImagePaths = await this.imageService.uploadImages(files, 'galeria');
    }

    // Actualizar la galería
    const updatedGaleria = await this.galeriaRepository.preload({
      idGaleria,
      ...updateGaleriaDto,
      imagen: newImagePaths, // Actualiza las imágenes
    });

    if (!updatedGaleria) {
      throw new NotFoundException(
        `Galeria con el id ${idGaleria} no encontrada.`,
      );
    }

    return await this.galeriaRepository.save(updatedGaleria);
  }

  async remove(idGaleria: string) {
    const existingGaleria = await this.findOne(idGaleria);

    if (!existingGaleria) {
      throw new NotFoundException(
        `Galeria con el id ${idGaleria} no encontrada.`,
      );
    }

    // Eliminar imágenes asociadas
    await this.imageService.deleteImages(existingGaleria.imagen);

    const result = await this.galeriaRepository.softDelete(idGaleria);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Galeria con el id ${idGaleria} no encontrada.`,
      );
    }

    return { message: `Galeria con el id ${idGaleria} eliminada.` };
  }

  async listaGaleria() {
    return await this.galeriaRepository.find({
      select: [
        'idGaleria',
        'estadoGaleria',
        'imagen',
        'tituloGaleria',
        'descripcion',
        'createAt',
        'updateAt',
      ],
    });
  }
}
