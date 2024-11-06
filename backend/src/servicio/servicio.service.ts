import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { FiltrosServicio } from './interfaces/servicio-filtro.interface';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  private aplicarFiltros(
    queryBuilder: SelectQueryBuilder<Servicio>,
    filtros: FiltrosServicio,
  ): SelectQueryBuilder<Servicio> {
    const {
      nombre,
      precioMinimo,
      precioMaximo,
      ordenPrecio,
      fechaCreacionDesde,
      fechaCreacionHasta,
    } = filtros;

    // Búsqueda por nombre (case insensitive)
    if (nombre) {
      queryBuilder.andWhere(
        'LOWER(servicio.nombreServicio) LIKE LOWER(:nombre)',
        {
          nombre: `%${nombre}%`,
        },
      );
    }

    // Rango de precios
    if (precioMinimo !== undefined) {
      queryBuilder.andWhere('servicio.precioServicio >= :precioMinimo', {
        precioMinimo,
      });
    }

    if (precioMaximo !== undefined) {
      queryBuilder.andWhere('servicio.precioServicio <= :precioMaximo', {
        precioMaximo,
      });
    }

    // Rango de fechas de creación
    if (fechaCreacionDesde && fechaCreacionHasta) {
      queryBuilder.andWhere(
        'servicio.createAt BETWEEN :fechaCreacionDesde AND :fechaCreacionHasta',
        {
          fechaCreacionDesde,
          fechaCreacionHasta,
        },
      );
    }

    // Ordenamiento por precio
    if (ordenPrecio) {
      queryBuilder.orderBy('servicio.precioServicio', ordenPrecio);
    } else {
      // Por defecto, ordenar por fecha de creación descendente
      queryBuilder.orderBy('servicio.createAt', 'DESC');
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

  async findAll(filtros: FiltrosServicio) {
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

  async listaServicios(filtros?: FiltrosServicio) {
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
