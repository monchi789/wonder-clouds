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
  Query,
} from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from '../imagenes/subir_image.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUsuario } from 'src/common/decorators/active-usuario.decorator';
import { UsuarioActiveInterface } from 'src/common/interfaces/usuario-active.interface';

@ApiTags('Publicacion')
@Controller('publicacion')
export class PublicacionController {
  constructor(
    private readonly publicacionService: PublicacionService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
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
    @ActiveUsuario() usuario: UsuarioActiveInterface,
  ) {
    if (!file) {
      throw new BadRequestException(
        'No se ha subido ninguna imagen de portada',
      );
    }

    const imagePath = await this.imageService.uploadImages([file], 'portadas');

    return this.publicacionService.create(
      createPublicacionDto,
      imagePath[0],
      usuario,
    );
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  findAll(
    @Query('categoria') categoria?: string,
    @Query('autor') autor?: string,
    @Query('fechaDesde') fechaDesde?: Date,
    @Query('fechaHasta') fechaHasta?: Date,
    @Query('busqueda') busqueda?: string,
  ) {
    return this.publicacionService.findAll({
      categoria,
      autor,
      fechaDesde,
      fechaHasta,
      busqueda,
    });
  }

  @Get('lista-publicacion')
  async listaPublicacion(
    @Query('categoria') categoria?: string,
    @Query('autor') autor?: string,
    @Query('fechaDesde') fechaDesde?: Date,
    @Query('fechaHasta') fechaHasta?: Date,
    @Query('busqueda') busqueda?: string,
  ) {
    return this.publicacionService.listaPublicacion({
      categoria,
      autor,
      fechaDesde,
      fechaHasta,
      busqueda,
    });
  }

  @Get('lista-publicacion/:id')
  async listaUnPublicacion(@Param('id') id: string) {
    return this.publicacionService.unPublicacion(id);
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  findOne(@Param('id') id: string) {
    return this.publicacionService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
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
    const existingPublicacion = await this.publicacionService.findOne(id);
    if (!existingPublicacion) {
      throw new NotFoundException(`Publicación con id ${id} no encontrada`);
    }

    let newImagePath = null;

    if (file) {
      await this.imageService.deleteImages([existingPublicacion.portada]);

      const newImagePaths = await this.imageService.uploadImages(
        [file],
        'portadas',
      );
      newImagePath = newImagePaths[0];
    }

    return this.publicacionService.update(
      id,
      updatePublicacionDto,
      newImagePath,
    );
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  async remove(@Param('id') id: string) {
    const publicacion = await this.publicacionService.findOne(id);
    if (!publicacion) {
      throw new NotFoundException(`Publicación con id ${id} no encontrada`);
    }

    await this.imageService.deleteImages([publicacion.portada]);

    return this.publicacionService.remove(id);
  }
}
