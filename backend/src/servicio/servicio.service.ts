import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { FiltroServicioDto } from './dto/servicio-filtro.dto';
import { Servicio } from './entities/servicio.entity';
import { ImageService } from '../imagenes/subir_image.service';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
    private readonly imageService: ImageService,
  ) {}

  private aplicarFiltros(
    queryBuilder: SelectQueryBuilder<Servicio>,
    filtros: FiltroServicioDto,
  ): SelectQueryBuilder<Servicio> {
    const { nombreServicio, precioMin, precioMax } = filtros;

    if (nombreServicio) {
      queryBuilder.andWhere('servicio.nombreServicio ILIKE :nombreServicio', {
        nombreServicio: `%${nombreServicio}%`,
      });
    }

    if (precioMin !== undefined) {
      queryBuilder.andWhere('servicio.precioServicio >= :precioMin', {
        precioMin,
      });
    }

    if (precioMax !== undefined) {
      queryBuilder.andWhere('servicio.precioServicio <= :precioMax', {
        precioMax,
      });
    }

    return queryBuilder;
  }

  async createWithImage(
    createServicioDto: CreateServicioDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún logo.');
    }

    const logoPath = await this.imageService.uploadImages([file], 'logos');

    const servicio = this.servicioRepository.create({
      ...createServicioDto,
      logoServicio: logoPath[0],
    });

    return await this.servicioRepository.save(servicio);
  }

  async updateWithImage(
    idServicio: string,
    updateServicioDto: UpdateServicioDto,
    file?: Express.Multer.File,
  ) {
    const servicio = await this.findOne(idServicio);

    let logoServicio = servicio.logoServicio;

    if (file) {
      // Eliminar imagen previa
      await this.imageService.deleteImages([servicio.logoServicio]);

      // Subir nueva imagen
      const newLogoPath = await this.imageService.uploadImages([file], 'logos');
      logoServicio = newLogoPath[0];
    }

    return await this.servicioRepository.save({
      ...servicio,
      ...updateServicioDto,
      logoServicio,
    });
  }

  async removeWithImage(idServicio: string) {
    const servicio = await this.findOne(idServicio);

    // Eliminar logo asociado
    await this.imageService.deleteImages([servicio.logoServicio]);

    return await this.servicioRepository.softDelete(idServicio);
  }

  async findAll(filtros: FiltroServicioDto) {
    const queryBuilder = this.servicioRepository.createQueryBuilder('servicio');
    return await this.aplicarFiltros(queryBuilder, filtros).getMany();
  }

  async findOne(idServicio: string) {
    const servicio = await this.servicioRepository.findOne({
      where: { idServicio },
    });

    if (!servicio) {
      throw new NotFoundException(
        `Servicio con el ID ${idServicio} no encontrado.`,
      );
    }

    return servicio;
  }

  async listaServicios(filtros?: FiltroServicioDto) {
    const queryBuilder = this.servicioRepository
      .createQueryBuilder('servicio')
      .select([
        'servicio.idServicio',
        'servicio.logoServicio',
        'servicio.nombreServicio',
        'servicio.precioServicio',
      ]);

    if (filtros) {
      this.aplicarFiltros(queryBuilder, filtros);
    }

    return await queryBuilder.getMany();
  }

  async unServicio(idServicio: string) {
    const servicio = await this.servicioRepository.findOne({
      where: { idServicio },
      select: [
        'idServicio',
        'logoServicio',
        'nombreServicio',
        'precioServicio',
      ],
    });

    if (!servicio) {
      throw new NotFoundException(
        `Servicio con el ID ${idServicio} no encontrado.`,
      );
    }

    return servicio;
  }
}
