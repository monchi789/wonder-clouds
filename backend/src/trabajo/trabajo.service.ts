import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Servicio } from 'src/servicio/entities/servicio.entity';
import { FiltroTrabajoDto } from './dto/trabajo.filtro.dto';

@Injectable()
export class TrabajoService {
  constructor(
    @InjectRepository(Trabajo)
    private readonly trabajoRepository: Repository<Trabajo>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  private aplicarFiltros(
    queryBuilder: SelectQueryBuilder<Trabajo>,
    filtros: FiltroTrabajoDto,
  ): SelectQueryBuilder<Trabajo> {
    const {
      nombreTrabajo,
      fechaDesde,
      fechaHasta,
      idServicio,
      visibilidadTrabajo,
    } = filtros;

    if (nombreTrabajo) {
      queryBuilder.andWhere('trabajo.nombreTrabajo ILIKE :nombreTrabajo', {
        nombreTrabajo: `%${nombreTrabajo}%`,
      });
    }

    if (fechaDesde && fechaHasta) {
      queryBuilder.andWhere(
        'trabajo.fechaTrabajo BETWEEN :fechaDesde AND :fechaHasta',
        { fechaDesde, fechaHasta },
      );
    } else if (fechaDesde) {
      queryBuilder.andWhere('trabajo.fechaTrabajo >= :fechaDesde', {
        fechaDesde,
      });
    } else if (fechaHasta) {
      queryBuilder.andWhere('trabajo.fechaTrabajo <= :fechaHasta', {
        fechaHasta,
      });
    }

    if (idServicio) {
      queryBuilder.andWhere('trabajo.idServicio = :idServicio', { idServicio });
    }

    if (visibilidadTrabajo !== undefined) {
      queryBuilder.andWhere(
        'trabajo.visibilidadTrabajo = :visibilidadTrabajo',
        { visibilidadTrabajo },
      );
    }

    return queryBuilder;
  }

  async create(createTrabajoDto: CreateTrabajoDto) {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: createTrabajoDto.idCliente },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente con el id ${createTrabajoDto.idCliente} no encontrado.`,
      );
    }

    const servicio = await this.servicioRepository.findOne({
      where: { idServicio: createTrabajoDto.idServicio },
    });

    if (!servicio) {
      throw new NotFoundException(
        `Servicio con el id ${createTrabajoDto.idServicio} no encontrado.`,
      );
    }

    const trabajo = this.trabajoRepository.create({
      ...createTrabajoDto,
      idCliente: cliente,
      idServicio: servicio,
    });

    return await this.trabajoRepository.save(trabajo);
  }

  async findAll(filtros: FiltroTrabajoDto) {
    const queryBuilder = this.trabajoRepository.createQueryBuilder('trabajo');
    return await this.aplicarFiltros(queryBuilder, filtros).getMany();
  }

  async findOne(idTrabajo: string) {
    const trabajo = await this.trabajoRepository.findOne({
      where: { idTrabajo },
      relations: ['idCliente', 'idServicio'],
    });

    if (!trabajo) {
      throw new NotFoundException(
        `Trabajo con el id ${idTrabajo} no encontrado.`,
      );
    }

    return trabajo;
  }

  async update(idTrabajo: string, updateTrabajoDto: UpdateTrabajoDto) {
    const trabajo = await this.findOne(idTrabajo);

    if (!trabajo) {
      throw new NotFoundException(
        `Trabajo con el id ${idTrabajo} no encontrado.`,
      );
    }

    if (updateTrabajoDto.idCliente) {
      const cliente = await this.clienteRepository.findOne({
        where: { idCliente: updateTrabajoDto.idCliente },
      });

      if (!cliente) {
        throw new NotFoundException(
          `Cliente con el id ${updateTrabajoDto.idCliente} no encontrado.`,
        );
      }

      trabajo.idCliente = cliente;
    }

    if (updateTrabajoDto.idServicio) {
      const servicio = await this.servicioRepository.findOne({
        where: { idServicio: updateTrabajoDto.idServicio },
      });

      if (!servicio) {
        throw new NotFoundException(
          `Servicio con el id ${updateTrabajoDto.idServicio} no encontrado.`,
        );
      }

      trabajo.idServicio = servicio;
    }

    Object.assign(trabajo, updateTrabajoDto);

    return await this.trabajoRepository.save(trabajo);
  }

  async remove(idTrabajo: string) {
    const trabajo = await this.trabajoRepository.softDelete(idTrabajo);

    if (trabajo.affected === 0) {
      throw new NotFoundException(
        `Trabajo con el id ${idTrabajo} no encontrado.`,
      );
    }

    return { message: `Trabajo con el id ${idTrabajo} eliminado.` };
  }

  async listaTrabajo(filtros?: FiltroTrabajoDto) {
    const queryBuilder = this.trabajoRepository
      .createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.idServicio', 'servicio')
      .select([
        'trabajo.idTrabajo',
        'trabajo.portadaTrabajo',
        'trabajo.nombreTrabajo',
        'servicio.nombreServicio',
      ]);

    if (filtros) {
      this.aplicarFiltros(queryBuilder, filtros);
    }

    return await queryBuilder.getMany();
  }

  async unTrabajo(idTrabajo: string) {
    const trabajo = await this.trabajoRepository.findOne({
      where: { idTrabajo },
      relations: ['idServicio'],
      select: [
        'idTrabajo',
        'descripcionTrabajo',
        'fechaTrabajo',
        'nombreTrabajo',
        'portadaTrabajo',
      ],
    });

    if (!trabajo) {
      throw new NotFoundException(
        `Trabajo con el ID ${idTrabajo} no encontrado`,
      );
    }

    return trabajo;
  }
}
