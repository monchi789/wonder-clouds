import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
  ) {}

  async create(createPublicacionDto: CreatePublicacionDto) {
    const publicacion = this.publicacionRepository.create(createPublicacionDto);
    return await this.publicacionRepository.save(publicacion);
  }

  async findAll() {
    return await this.publicacionRepository.find();
  }

  async findOne(idPublicacion: string) {
    try {
      const publicacion = await this.publicacionRepository.findOne({
        where: { idPublicacion },
      });

      if (!publicacion) {
        throw new NotFoundException(
          `Publicacion con el id ${idPublicacion} no encontrado.`,
        );
      }

      return publicacion;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es valido');
    }
  }

  async update(
    idPublicacion: string,
    updatePublicacionDto: UpdatePublicacionDto,
  ) {
    const publicacion = this.publicacionRepository.update(
      idPublicacion,
      updatePublicacionDto,
    );

    if ((await publicacion).affected === 0) {
      throw new NotFoundException(
        `Publicacion con el ID ${idPublicacion} no encontrado`,
      );
    }

    return this.publicacionRepository.findOne({ where: { idPublicacion } });
  }

  async remove(idPublicacion: string) {
    const publicacion =
      await this.publicacionRepository.softDelete(idPublicacion);

    if ((await publicacion).affected === 0) {
      throw new NotFoundException(
        `Publicacion con el ID ${idPublicacion} no encontrada.`,
      );
    }

    return { message: `Publicacion con el ID ${idPublicacion} eliminada.` };
  }
}
