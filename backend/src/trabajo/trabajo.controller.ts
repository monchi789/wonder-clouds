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
} from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Trabajo')
@Controller('trabajo')
export class TrabajoController {
  constructor(private readonly trabajoService: TrabajoService) {}

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
      throw new BadRequestException('No se ha subido ninguna imagen de portada');
    }

    const portadaTrabajo = `/uploads/portadasTrabajo/${file.filename}`;
    return this.trabajoService.create(createTrabajoDto, portadaTrabajo);
  }

  @Get()
  findAll() {
    return this.trabajoService.findAll();
  }

  @Get(':id')
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
    const portadaTrabajo = file ? `/uploads/portadasTrabajo/${file.filename}` : null;
    return this.trabajoService.update(id, updateTrabajoDto, portadaTrabajo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabajoService.remove(id);
  }
}
