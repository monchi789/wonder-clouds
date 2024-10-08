import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleTrabajoDto } from './dto/create-detalle-trabajo.dto';
import { UpdateDetalleTrabajoDto } from './dto/update-detalle-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleTrabajo } from './entities/detalle-trabajo.entity';
import { Repository } from 'typeorm';
import { Trabajo } from 'src/trabajo/entities/trabajo.entity';

@Injectable()
export class DetalleTrabajoService {
  constructor(
    @InjectRepository(DetalleTrabajo)
    private readonly detalleTrabajoRepository: Repository<DetalleTrabajo>,
    @InjectRepository(Trabajo)
    private readonly trabajoRepository: Repository<Trabajo>,
  ) {}

  async create(createDetalleTrabajoDto: CreateDetalleTrabajoDto) {
    const trabajo = await this.trabajoRepository.findOne({
      where: { idTrabajo: createDetalleTrabajoDto.idTrabajo },
    });

    if (!trabajo) {
      throw new NotFoundException(
        `Trabajo con el id ${createDetalleTrabajoDto.idTrabajo} no encontrado.`,
      );
    }

    const detalleTrabajo = this.detalleTrabajoRepository.create({
      ...createDetalleTrabajoDto,
      idTrabajo: trabajo,
    });

    return await this.detalleTrabajoRepository.save(detalleTrabajo);
  }

  async findAll() {
    return await this.detalleTrabajoRepository.find({
      relations: ['idTrabajo'],
    });
  }

  async findOne(idDetalleTrabajo: string) {
    try {
      const detalleTrabajo = await this.detalleTrabajoRepository.findOne({
        where: { idDetalleTrabajo },
        relations: ['idTrabajo'],
      });

      if (!detalleTrabajo) {
        throw new NotFoundException(
          `DetalleTrabajo con el id ${idDetalleTrabajo} no encontrado.`,
        );
      }

      return detalleTrabajo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es válido');
    }
  }

  async update(
    idDetalleTrabajo: string,
    updateDetalleTrabajoDto: UpdateDetalleTrabajoDto,
  ) {
    let trabajo = null;
    if (updateDetalleTrabajoDto.idTrabajo) {
      trabajo = await this.trabajoRepository.findOne({
        where: { idTrabajo: updateDetalleTrabajoDto.idTrabajo },
      });

      if (!trabajo) {
        throw new NotFoundException(
          `Trabajo con el id ${updateDetalleTrabajoDto.idTrabajo} no encontrado.`,
        );
      }
    }

    const detalleTrabajo = await this.detalleTrabajoRepository.preload({
      idDetalleTrabajo,
      ...updateDetalleTrabajoDto,
      idTrabajo: trabajo ? trabajo : undefined,
    });

    if (!detalleTrabajo) {
      throw new NotFoundException(
        `DetalleTrabajo con el id ${idDetalleTrabajo} no encontrado.`,
      );
    }

    return await this.detalleTrabajoRepository.save(detalleTrabajo);
  }

  async remove(idDetalleTrabajo: string) {
    const detalleTrabajo =
      await this.detalleTrabajoRepository.softDelete(idDetalleTrabajo);

    if (detalleTrabajo.affected === 0) {
      throw new NotFoundException(
        `DetalleTrabajo con el id ${idDetalleTrabajo} no encontrado.`,
      );
    }

    return {
      message: `DetalleTrabajo con el id ${idDetalleTrabajo} eliminado.`,
    };
  }
}
