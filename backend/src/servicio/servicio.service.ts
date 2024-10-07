import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioRepository: Repository<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto) {
    const servicio = this.servicioRepository.create(createServicioDto);
    return await this.servicioRepository.save(servicio);
  }

  async findAll() {
    return await this.servicioRepository.find();
  }

  async findOne(idServicio: string) {
    try {
      const servicio = await this.servicioRepository.findOne({
        where: { idServicio },
      });

      if (!servicio) {
        throw new NotFoundException(
          `Servicio con el ID ${idServicio} no encontrado.`,
        );
      }

      return servicio;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es valido');
    }
  }

  async update(idServicio: string, updateServicioDto: UpdateServicioDto) {
    const servicio = this.servicioRepository.update(
      idServicio,
      updateServicioDto,
    );

    if ((await servicio).affected === 0) {
      throw new NotFoundException(
        `Servicio con el ID ${idServicio} no encontrado`,
      );
    }

    return this.servicioRepository.findOne({ where: { idServicio } });
  }

  async remove(idServicio: string) {
    const servicio = await this.servicioRepository.softDelete(idServicio);

    if ((await servicio).affected === 0) {
      throw new NotFoundException(
        `Publicacion con el ID ${idServicio} no encontrada`,
      );
    }

    return { mesage: `Publicacion con el ID ${idServicio} eliminada` };
  }
}
