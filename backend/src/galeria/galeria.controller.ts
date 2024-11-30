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
  BadRequestException,
} from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { UpdateGaleriaDto } from './dto/update-galeria.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { GaleriaDocumentationDto } from './documentation/galeriadoc.dto';

@ApiTags('Galeria')
@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Crear una nueva galería' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para crear una nueva galería',
    type: GaleriaDocumentationDto,
  })
  @ApiResponse({ status: 201, description: 'Galería creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'No se han subido imágenes.' })
  @UseInterceptors(FilesInterceptor('imagenes', 10))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createGaleriaDto: CreateGaleriaDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes.');
    }

    return this.galeriaService.create(createGaleriaDto, files);
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Obtiene todas las galerías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de galerías obtenida exitosamente.',
  })
  findAll() {
    return this.galeriaService.findAll();
  }

  @Get('lista-galeria')
  @ApiOperation({ summary: 'Obtiene una lista simplificada de galerías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de galerías obtenida exitosamente.',
  })
  listaGaleria() {
    return this.galeriaService.listaGaleria();
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Obtiene una galería por su ID' })
  @ApiResponse({ status: 200, description: 'Galería obtenida exitosamente.' })
  @ApiResponse({ status: 404, description: 'Galería no encontrada.' })
  @ApiParam({ name: 'id', description: 'ID de la galería a obtener' })
  findOne(@Param('id') id: string) {
    return this.galeriaService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Actualizar una galería' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiParam({ name: 'id', description: 'ID de la galería a actualizar' })
  @ApiBody({
    description: 'Estructura necesaria para actualizar una galería',
    type: GaleriaDocumentationDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Galería actualizada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Galería no encontrada.' })
  @UseInterceptors(FilesInterceptor('imagenes', 10))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateGaleriaDto: UpdateGaleriaDto,
  ) {
    return this.galeriaService.update(id, updateGaleriaDto, files);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Eliminar una galería' })
  @ApiParam({ name: 'id', description: 'ID de la galería a eliminar' })
  @ApiResponse({ status: 200, description: 'Galería eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Galería no encontrada.' })
  async remove(@Param('id') id: string) {
    return this.galeriaService.remove(id);
  }
}
