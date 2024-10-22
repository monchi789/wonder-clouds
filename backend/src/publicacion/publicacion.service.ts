import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Repository } from 'typeorm';
import { TipoGeneral } from 'src/tipo-general/entities/tipo-general.entity';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,

    @InjectRepository(TipoGeneral)
    private readonly tipoGeneralRepository: Repository<TipoGeneral>,
  ) {}

  async create(createPublicacionDto: CreatePublicacionDto, portada: string) {
    const tipo = await this.tipoGeneralRepository.findOne({
      where: { nombre: createPublicacionDto.categoriaPublicacion },
    });

    if (!tipo) {
      throw new NotFoundException('El tipo de publicacion no encontrado');
    }

    const publicacion = this.publicacionRepository.create({
      ...createPublicacionDto,
      portada,
    });

    return await this.publicacionRepository.save(publicacion);
  }

  async findAll() {
    return await this.publicacionRepository.find();
  }

  async findOne(idPublicacion: string) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { idPublicacion },
    });

    if (!publicacion) {
      throw new NotFoundException(
        `Publicacion con el id ${idPublicacion} no encontrada.`,
      );
    }

    return publicacion;
  }

  async update(
    idPublicacion: string,
    updatePublicacionDto: UpdatePublicacionDto,
    portada?: string,
  ) {
    const publicacion = await this.publicacionRepository.preload({
      idPublicacion,
      ...updatePublicacionDto,
    });

    if (!publicacion) {
      throw new NotFoundException(
        `Publicacion con el ID ${idPublicacion} no encontrada`,
      );
    }

    if (portada) {
      publicacion.portada = portada;
    }

    return await this.publicacionRepository.save(publicacion);
  }

  async remove(idPublicacion: string) {
    const publicacion =
      await this.publicacionRepository.softDelete(idPublicacion);

    if (publicacion.affected === 0) {
      throw new NotFoundException(
        `Publicacion con el ID ${idPublicacion} no encontrada.`,
      );
    }

    return { message: `Publicacion con el ID ${idPublicacion} eliminada.` };
  }
}
