import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { FiltroProductoDto } from './dto/producto-filtro.dto';
import { ProductoDocumentationDto } from './documentation/productodoc.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para nuevo producto',
    type: ProductoDocumentationDto,
  })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'No se han subido imágenes.' })
  @UseInterceptors(FilesInterceptor('imagenes', 10))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductoDto: CreateProductoDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes.');
    }

    return this.productoService.create(createProductoDto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los productos' })
  async findAll(@Query() filtros: FiltroProductoDto) {
    return this.productoService.findAll(filtros);
  }

  @Get('publicos')
  @ApiOperation({ summary: 'Obtiene todos los productos públicos' })
  async findPublicos(@Query() filtros: FiltroProductoDto) {
    return this.productoService.findPublicos(filtros);
  }

  @Get('publicos/:id')
  @ApiOperation({ summary: 'Obtiene un producto público por ID' })
  async findPublicoById(@Param('id') id: string) {
    return this.productoService.findPublicoById(id);
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Obtiene un producto por su ID' })
  async findOne(@Param('id') id: string) {
    return this.productoService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para actualizar producto',
    type: ProductoDocumentationDto,
  })
  @ApiOperation({ summary: 'Actualizar un producto' })
  @UseInterceptors(FilesInterceptor('imagenes', 10))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productoService.update(id, updateProductoDto, files);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Eliminar un producto' })
  async remove(@Param('id') id: string) {
    return this.productoService.remove(id);
  }
}
