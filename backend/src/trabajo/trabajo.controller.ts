import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from '../imagenes/subir_image.service';

@ApiTags('Trabajo')
@Controller('trabajo')
export class TrabajoController {
  constructor(
    private readonly trabajoService: TrabajoService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreTrabajo: { type: 'string' },
        descripcionTrabajo: { type: 'string' },
        visibilidadTrabajo: { type: 'boolean' },
        fechaTrabajo: { type: 'string', format: 'date' },
        tipoTrabajo: { type: 'string' },
        idCliente: { type: 'string' },
        portadaTrabajo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('portadaTrabajo', {
      storage: diskStorage({
        destination: './uploads/portadasTrabajo',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTrabajoDto: CreateTrabajoDto,
  ) {
    if (!file) {
      throw new BadRequestException(
        'No se ha subido ninguna imagen de portada',
      );
    }

    const imagePath = await this.imageService.uploadImages(
      [file],
      'portadasTrabajo',
    );

    return this.trabajoService.create(createTrabajoDto, imagePath[0]);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los trabajos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de trabajos obtenida exitosamente.',
  })
  findAll() {
    return this.trabajoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un trabajo por su ID' })
  @ApiResponse({ status: 200, description: 'Trabajo obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Trabajo no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.trabajoService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreTrabajo: { type: 'string' },
        descripcionTrabajo: { type: 'string' },
        visibilidadTrabajo: { type: 'boolean' },
        fechaTrabajo: { type: 'string', format: 'date' },
        tipoTrabajo: { type: 'string' },
        idCliente: { type: 'string' },
        portadaTrabajo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('portadaTrabajo', {
      storage: diskStorage({
        destination: './uploads/portadasTrabajo',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateTrabajoDto: UpdateTrabajoDto,
  ) {
    const existingTrabajo = await this.trabajoService.findOne(id);
    if (!existingTrabajo) {
      throw new NotFoundException(`Trabajo con id ${id} no encontrado`);
    }

    let newImagePath = null;

    if (file) {
      await this.imageService.deleteImages([existingTrabajo.portadaTrabajo]);

      const newImagePaths = await this.imageService.uploadImages(
        [file],
        'portadasTrabajo',
      );
      newImagePath = newImagePaths[0];
    }

    return this.trabajoService.update(id, updateTrabajoDto, newImagePath);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un trabajo por su ID' })
  @ApiResponse({ status: 200, description: 'Trabajo eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Trabajo no encontrado.' })
  async remove(@Param('id') id: string) {
    const trabajo = await this.trabajoService.findOne(id);
    if (!trabajo) {
      throw new NotFoundException(`Trabajo con id ${id} no encontrado`);
    }

    await this.imageService.deleteImages([trabajo.portadaTrabajo]);

    return this.trabajoService.remove(id);
  }
}
