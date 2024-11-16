import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import {
  Repository,
  FindOptionsWhere,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { ImageService } from '../imagenes/subir_image.service';
import { FiltroProductoDto } from './dto/producto-filtro.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly imageService: ImageService,
  ) {}

  async create(
    createProductoDto: CreateProductoDto,
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes.');
    }

    const imagePaths = await this.imageService.uploadImages(files, 'productos');

    const productoData = {
      ...createProductoDto,
      imagenProducto: imagePaths,
    };

    const producto = this.productoRepository.create(productoData);
    return await this.productoRepository.save(producto);
  }

  async findAll(filtros?: FiltroProductoDto) {
    const where: FindOptionsWhere<Producto> = {};

    if (filtros?.nombreProducto) {
      where.nombreProducto = filtros.nombreProducto;
    }

    if (filtros?.precioMinimo || filtros?.precioMaximo) {
      if (filtros.precioMinimo && filtros.precioMaximo) {
        where.precioPruducto =
          MoreThanOrEqual(filtros.precioMinimo) &&
          LessThanOrEqual(filtros.precioMaximo);
      } else if (filtros.precioMinimo) {
        where.precioPruducto = MoreThanOrEqual(filtros.precioMinimo);
      } else if (filtros.precioMaximo) {
        where.precioPruducto = LessThanOrEqual(filtros.precioMaximo);
      }
    }

    if (filtros?.categoriaProducto) {
      where.categoriaProducto = filtros.categoriaProducto;
    }

    if (filtros?.estadoActivo !== undefined) {
      where.estadoActivo = filtros.estadoActivo;
    }

    return await this.productoRepository.find({ where });
  }

  async findPublicos(filtros?: FiltroProductoDto) {
    const where: FindOptionsWhere<Producto> = { estadoActivo: true };

    if (filtros?.categoriaProducto) {
      where.categoriaProducto = filtros.categoriaProducto;
    }

    return await this.productoRepository.find({ where });
  }

  async findPublicoById(idProducto: string) {
    const producto = await this.productoRepository.findOne({
      where: { idProducto, estadoActivo: true },
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto público con el ID ${idProducto} no encontrado.`,
      );
    }

    return producto;
  }

  async findOne(idProducto: string) {
    const producto = await this.productoRepository.findOne({
      where: { idProducto },
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto con el id ${idProducto} no encontrado.`,
      );
    }

    return producto;
  }

  async update(
    idProducto: string,
    updateProductoDto: UpdateProductoDto,
    files?: Express.Multer.File[],
  ) {
    const existingProducto = await this.findOne(idProducto);

    let newImagePaths: string[] = existingProducto.imagenProducto;

    if (files && files.length > 0) {
      await this.imageService.deleteImages(existingProducto.imagenProducto);

      newImagePaths = await this.imageService.uploadImages(files, 'productos');
    }

    const updatedProducto = await this.productoRepository.preload({
      idProducto,
      ...updateProductoDto,
      imagenProducto: newImagePaths,
    });

    if (!updatedProducto) {
      throw new NotFoundException(
        `Producto con el id ${idProducto} no encontrado.`,
      );
    }

    return await this.productoRepository.save(updatedProducto);
  }

  async remove(idProducto: string) {
    const existingProducto = await this.findOne(idProducto);

    await this.imageService.deleteImages(existingProducto.imagenProducto);

    const result = await this.productoRepository.softDelete(idProducto);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Producto con el id ${idProducto} no encontrado.`,
      );
    }

    return { message: `Producto con el id ${idProducto} eliminado.` };
  }
}
