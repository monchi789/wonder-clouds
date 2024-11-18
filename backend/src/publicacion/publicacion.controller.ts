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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUsuario } from 'src/common/decorators/active-usuario.decorator';
import { UsuarioActiveInterface } from 'src/common/interfaces/usuario-active.interface';
import { FiltrosPublicacionDto } from './dto/publicacion-filtro.dto';
import { PublicacionDocumentationDto } from './documentation/publicaciodoc.dto';

@ApiTags('Publicacion')
@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para crear una nueva publicacion',
    type: PublicacionDocumentationDto,
  })
  @UseInterceptors(FileInterceptor('portada'))
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

    return this.publicacionService.create(
      createPublicacionDto,
      [file],
      usuario,
    );
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAll(@Query() filtros: FiltrosPublicacionDto) {
    return this.publicacionService.findAll(filtros);
  }

  @Get('lista-publicacion')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async listaPublicacion(@Query() filtros: FiltrosPublicacionDto) {
    return this.publicacionService.listaPublicacion(filtros);
  }

  @Get('lista-publicacion/:id')
  async listaUnPublicacion(@Param('id') id: string) {
    return this.publicacionService.unPublicacion(id);
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  async findOne(@Param('id') id: string) {
    return this.publicacionService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para actualizar una publicacion',
    type: PublicacionDocumentationDto,
  })
  @UseInterceptors(FileInterceptor('portada'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePublicacionDto: UpdatePublicacionDto,
  ) {
    return this.publicacionService.update(
      id,
      updatePublicacionDto,
      file ? [file] : [],
    );
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  async remove(@Param('id') id: string) {
    return this.publicacionService.remove(id);
  }
}
