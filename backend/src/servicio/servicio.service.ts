import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { FiltroServicioDto } from './dto/servicio-filtro.dto';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
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

  async create(createServicioDto: CreateServicioDto, logoServicio: string) {
    const servicio = this.servicioRepository.create({
      ...createServicioDto,
      logoServicio,
    });

    return await this.servicioRepository.save(servicio);
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

  async update(
    idServicio: string,
    updateServicioDto: UpdateServicioDto,
    logoServicio?: string,
  ) {
    const servicio = await this.servicioRepository.preload({
      idServicio,
      ...updateServicioDto,
    });

    if (!servicio) {
      throw new NotFoundException(
        `Servicio con el ID ${idServicio} no encontrado`,
      );
    }

    if (logoServicio) {
      servicio.logoServicio = logoServicio;
    }

    return await this.servicioRepository.save(servicio);
  }

  async remove(idServicio: string) {
    const servicio = await this.servicioRepository.softDelete(idServicio);

    if (servicio.affected === 0) {
      throw new NotFoundException(
        `Servicio con el ID ${idServicio} no encontrado.`,
      );
    }

    return { message: `Servicio con el ID ${idServicio} eliminado.` };
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
