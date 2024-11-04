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
import { ServicioService } from './servicio.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from '../imagenes/subir_image.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@ApiTags('Servicio')
@Controller('servicio')
export class ServicioController {
  constructor(
    private readonly servicioService: ServicioService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreServicio: { type: 'string' },
        precioServicio: { type: 'number' },
        logoServicio: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('logoServicio', {
      storage: diskStorage({
        destination: './uploads/logos',
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
    @Body() createServicioDto: CreateServicioDto,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún logo');
    }

    const logoPath = await this.imageService.uploadImages([file], 'logos');

    return this.servicioService.create(createServicioDto, logoPath[0]);
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  findAll() {
    return this.servicioService.findAll();
  }

  @Get('lista-servicio')
  async listaServicio() {
    return this.servicioService.listaServicios();
  }

  @Get('lista-servicio/:id')
  async listaUnServicio(@Param('id') id: string) {
    return this.servicioService.unServicio(id);
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  findOne(@Param('id') id: string) {
    return this.servicioService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombreServicio: { type: 'string' },
        precioServicio: { type: 'number' },
        logoServicio: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('logoServicio', {
      storage: diskStorage({
        destination: './uploads/logos',
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
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    const existingServicio = await this.servicioService.findOne(id);
    if (!existingServicio) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }

    let newLogoPath = null;

    if (file) {
      await this.imageService.deleteImages([existingServicio.logoServicio]);

      const newLogoPaths = await this.imageService.uploadImages(
        [file],
        'logos',
      );
      newLogoPath = newLogoPaths[0];
    }

    return this.servicioService.update(id, updateServicioDto, newLogoPath);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const servicio = await this.servicioService.findOne(id);
    if (!servicio) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }

    await this.imageService.deleteImages([servicio.logoServicio]);

    return this.servicioService.remove(id);
  }
}
