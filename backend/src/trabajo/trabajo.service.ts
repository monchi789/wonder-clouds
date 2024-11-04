import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class TrabajoService {
  constructor(
    @InjectRepository(Trabajo)
    private readonly trabajoRepository: Repository<Trabajo>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createTrabajoDto: CreateTrabajoDto, portadaTrabajo: string) {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: createTrabajoDto.idCliente },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente con el id ${createTrabajoDto.idCliente} no encontrado.`,
      );
    }

    const trabajo = this.trabajoRepository.create({
      ...createTrabajoDto,
      portadaTrabajo,
      idCliente: cliente,
    });

    return await this.trabajoRepository.save(trabajo);
  }

  async findAll() {
    return await this.trabajoRepository.find({
      relations: ['idCliente'],
    });
  }

  async findOne(idTrabajo: string) {
    const trabajo = await this.trabajoRepository.findOne({
      where: { idTrabajo },
      relations: ['idCliente'],
    });

    if (!trabajo) {
      throw new NotFoundException(
        `Trabajo con el id ${idTrabajo} no encontrado.`,
      );
    }

    return trabajo;
  }

  async update(
    idTrabajo: string,
    updateTrabajoDto: UpdateTrabajoDto,
    portadaTrabajo?: string,
  ) {
    let cliente = null;
    if (updateTrabajoDto.idCliente) {
      cliente = await this.clienteRepository.findOne({
        where: { idCliente: updateTrabajoDto.idCliente },
      });

      if (!cliente) {
        throw new NotFoundException(
          `Cliente con el id ${updateTrabajoDto.idCliente} no encontrado.`,
        );
      }
    }

    const trabajo = await this.trabajoRepository.preload({
      idTrabajo,
      ...updateTrabajoDto,
      idCliente: cliente ? cliente : undefined,
    });

    if (!trabajo) {
      throw new NotFoundException(
        `Trabajo con el id ${idTrabajo} no encontrado.`,
      );
    }

    if (portadaTrabajo) {
      trabajo.portadaTrabajo = portadaTrabajo;
    }

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

  async listaTrabajo() {
    return await this.trabajoRepository.find({
      select: [
        'idTrabajo',
        'descripcionTrabajo',
        'fechaTrabajo',
        'nombreTrabajo',
        'portadaTrabajo',
        'tipoTrabajo',
      ],
    });
  }

  async unTrabajo(idTrabajo: string) {
    const trabajo = await this.trabajoRepository.findOne({
      where: { idTrabajo },
      select: [
        'idTrabajo',
        'descripcionTrabajo',
        'fechaTrabajo',
        'nombreTrabajo',
        'portadaTrabajo',
        'tipoTrabajo',
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
