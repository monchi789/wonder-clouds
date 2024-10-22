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
import { ServicioService } from './servicio.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Servicio')
@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Post()
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

    const logoPath = `/uploads/logos/${file.filename}`;
    return this.servicioService.create(createServicioDto, logoPath);
  }

  @Get()
  findAll() {
    return this.servicioService.findAll();
  }

  @Get(':id')
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
    
    const logoPath = file ? `/uploads/logos/${file.filename}` : null;
    return this.servicioService.update(id, updateServicioDto, logoPath);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicioService.remove(id);
  }
}
