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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { FiltroServicioDto } from './dto/servicio-filtro.dto';
import { ServicioDocumentationDto } from './documentation/serviciodoc.dto';

@ApiTags('Servicio')
@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para crear un nuevo servicio',
    type: ServicioDocumentationDto,
  })
  @UseInterceptors(FileInterceptor('logoServicio'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createServicioDto: CreateServicioDto,
  ) {
    return this.servicioService.createWithImage(createServicioDto, file);
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  findAll(@Query() filtros: FiltroServicioDto) {
    return this.servicioService.findAll(filtros);
  }

  @Get('lista-servicio')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async listaServicio(@Query() filtros: FiltroServicioDto) {
    return this.servicioService.listaServicios(filtros);
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
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para actualizar un servicio',
    type: ServicioDocumentationDto,
  })
  @UseInterceptors(FileInterceptor('logoServicio'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.servicioService.updateWithImage(id, updateServicioDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.servicioService.removeWithImage(id);
  }
}
