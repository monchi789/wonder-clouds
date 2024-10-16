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

  async create(createServicioDto: CreateServicioDto, logoServicio: string) {

    const servicio = this.servicioRepository.create({
      ...createServicioDto,
      logoServicio, 
    });

    return await this.servicioRepository.save(servicio);
  }

  async findAll() {
    return await this.servicioRepository.find();
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
}
