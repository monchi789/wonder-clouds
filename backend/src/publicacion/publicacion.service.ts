import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TipoGeneral } from 'src/tipo-general/entities/tipo-general.entity';
import { UsuarioActiveInterface } from 'src/common/interfaces/usuario-active.interface';
import { FiltrosPublicacion } from './interfaces/publicacion-filtro.interface';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,

    @InjectRepository(TipoGeneral)
    private readonly tipoGeneralRepository: Repository<TipoGeneral>,
  ) {}

  private aplicarFiltros(
    queryBuilder: SelectQueryBuilder<Publicacion>,
    filtros: FiltrosPublicacion,
  ): SelectQueryBuilder<Publicacion> {
    const { categoria, autor, fechaDesde, fechaHasta, busqueda } = filtros;

    if (categoria) {
      queryBuilder.andWhere('publicacion.categoriaPublicacion = :categoria', {
        categoria,
      });
    }

    if (autor) {
      queryBuilder.andWhere('publicacion.autor = :autor', {
        autor,
      });
    }

    if (fechaDesde && fechaHasta) {
      queryBuilder.andWhere(
        'publicacion.fechaPublicacion BETWEEN :fechaDesde AND :fechaHasta',
        {
          fechaDesde,
          fechaHasta,
        },
      );
    }

    if (busqueda) {
      queryBuilder.andWhere(
        '(publicacion.titulo ILIKE :busqueda OR publicacion.contenido ILIKE :busqueda)',
        { busqueda: `%${busqueda}%` },
      );
    }

    return queryBuilder;
  }

  async create(
    createPublicacionDto: CreatePublicacionDto,
    portada: string,
    usuario: UsuarioActiveInterface,
  ) {
    const tipo = await this.tipoGeneralRepository.findOne({
      where: { nombre: createPublicacionDto.categoriaPublicacion },
    });

    if (!tipo) {
      throw new NotFoundException('El tipo general no encontrado');
    }

    const publicacion = this.publicacionRepository.create({
      ...createPublicacionDto,
      portada,
      autor: usuario.usuario,
    });

    return await this.publicacionRepository.save(publicacion);
  }

  async findAll(filtros: FiltrosPublicacion) {
    const queryBuilder =
      this.publicacionRepository.createQueryBuilder('publicacion');

    return await this.aplicarFiltros(queryBuilder, filtros).getMany();
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

  async listaPublicacion(filtros: FiltrosPublicacion) {
    const queryBuilder = this.publicacionRepository
      .createQueryBuilder('publicacion')
      .select([
        'publicacion.idPublicacion',
        'publicacion.autor',
        'publicacion.categoriaPublicacion',
        'publicacion.contenido',
        'publicacion.fechaPublicacion',
        'publicacion.portada',
        'publicacion.titulo',
      ]);

    return await this.aplicarFiltros(queryBuilder, filtros).getMany();
  }

  async unPublicacion(idPublicacion: string) {
    return await this.publicacionRepository.findOne({
      where: { idPublicacion },
      select: [
        'idPublicacion',
        'autor',
        'categoriaPublicacion',
        'contenido',
        'fechaPublicacion',
        'portada',
        'titulo',
      ],
    });
  }
}
