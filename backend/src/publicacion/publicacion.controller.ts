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
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Publicacion')
@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string' },
        contenido: { type: 'string' },
        fechaPublicacion: { type: 'string', format: 'date' },
        categoriaPublicacion: { type: 'string' },
        portada: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('portada', {
      storage: diskStorage({
        destination: './uploads/portadas',
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
    @Body() createPublicacionDto: CreatePublicacionDto,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ninguna imagen de portada');
    }

    const imagePath = `/uploads/portadas/${file.filename}`;
    return this.publicacionService.create(createPublicacionDto, imagePath);
  }

  @Get()
  findAll() {
    return this.publicacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string' },
        contenido: { type: 'string' },
        fechaPublicacion: { type: 'string', format: 'date' },
        categoriaPublicacion: { type: 'string' },
        portada: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('portada', {
      storage: diskStorage({
        destination: './uploads/portadas',
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
    @Body() updatePublicacionDto: UpdatePublicacionDto,
  ) {
    const imagePath = file ? `/uploads/portadas/${file.filename}` : null;
    return this.publicacionService.update(id, updatePublicacionDto, imagePath);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionService.remove(id);
  }
}
