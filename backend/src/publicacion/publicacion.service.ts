import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TipoGeneral } from 'src/tipo-general/entities/tipo-general.entity';
import { UsuarioActiveInterface } from 'src/common/interfaces/usuario-active.interface';
import { FiltrosPublicacionDto } from './dto/publicacion-filtro.dto';
import { ImageService } from '../imagenes/subir_image.service';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,

    @InjectRepository(TipoGeneral)
    private readonly tipoGeneralRepository: Repository<TipoGeneral>,

    private readonly imageService: ImageService,
  ) {}

  private aplicarFiltros(
    queryBuilder: SelectQueryBuilder<Publicacion>,
    filtros: FiltrosPublicacionDto,
  ): SelectQueryBuilder<Publicacion> {
    const { categoria, autor, fechaDesde, fechaHasta, busqueda } = filtros;

    if (categoria) {
      queryBuilder.andWhere('publicacion.categoriaPublicacion = :categoria', {
        categoria,
      });
    }

    if (autor) {
      queryBuilder.andWhere('publicacion.autor = :autor', { autor });
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
    files: Express.Multer.File[],
    usuario: UsuarioActiveInterface,
  ) {
    let portada = null;

    if (files && files.length > 0) {
      const imagePaths = await this.imageService.uploadImages(
        files,
        'portadas',
      );
      portada = imagePaths[0];
    }

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

  async update(
    id: string,
    updatePublicacionDto: UpdatePublicacionDto,
    files?: Express.Multer.File[],
  ) {
    const publicacion = await this.findOne(id);

    let portada = publicacion.portada;

    if (files && files.length > 0) {
      await this.imageService.deleteImages([portada]);
      const imagePaths = await this.imageService.uploadImages(
        files,
        'portadas',
      );
      portada = imagePaths[0];
    }

    Object.assign(publicacion, { ...updatePublicacionDto, portada });

    return await this.publicacionRepository.save(publicacion);
  }

  async findAll(filtros: FiltrosPublicacionDto) {
    const queryBuilder =
      this.publicacionRepository.createQueryBuilder('publicacion');

    return await this.aplicarFiltros(queryBuilder, filtros).getMany();
  }

  async findOne(id: string) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { idPublicacion: id },
    });

    if (!publicacion) {
      throw new NotFoundException(`Publicación con el id ${id} no encontrada.`);
    }

    return publicacion;
  }

  async remove(id: string) {
    const publicacion = await this.findOne(id);
    await this.imageService.deleteImages([publicacion.portada]);

    return await this.publicacionRepository.softDelete(id);
  }

  async listaPublicacion(filtros: FiltrosPublicacionDto) {
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
