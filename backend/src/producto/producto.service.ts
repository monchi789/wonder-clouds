import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { ImageService } from '../imagenes/subir_image.service';

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

  async findAll() {
    return await this.productoRepository.find();
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

    if (!existingProducto) {
      throw new NotFoundException(
        `Producto con el id ${idProducto} no encontrado.`,
      );
    }

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

    if (!existingProducto) {
      throw new NotFoundException(
        `Producto con el id ${idProducto} no encontrado.`,
      );
    }

    await this.imageService.deleteImages(existingProducto.imagenProducto);

    const result = await this.productoRepository.softDelete(idProducto);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Producto con el id ${idProducto} no encontrado.`,
      );
    }

    return { message: `Producto con el id ${idProducto} eliminado.` };
  }

  async listaProductos() {
    return await this.productoRepository.find({
      select: [
        'idProducto',
        'nombreProducto',
        'descripcionProducto',
        'precioPruducto',
        'imagenProducto',
        'categoriaProducto',
        'estadoActivo',
        'createAt',
        'updateAt',
      ],
    });
  }
}
