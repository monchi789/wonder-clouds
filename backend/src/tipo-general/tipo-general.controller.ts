import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoGeneralService } from './tipo-general.service';
import { CreateTipoGeneralDto } from './dto/create-tipo-general.dto';
import { UpdateTipoGeneralDto } from './dto/update-tipo-general.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { TipoGeneralDocumentationDto } from './documentation/tipo-generaldoc.dto';

@ApiTags('Tipo General')
@Controller('tipo-general')
export class TipoGeneralController {
  constructor(private readonly tipoGeneralService: TipoGeneralService) {}

  @Post()
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para crear un nuevo tipo general',
    type: TipoGeneralDocumentationDto,
  })
  @Auth(Rol.ADMIN)
  create(@Body() createTipoGeneralDto: CreateTipoGeneralDto) {
    return this.tipoGeneralService.create(createTipoGeneralDto);
  }

  @Get()
  @Auth(Rol.ADMIN)
  findAll() {
    return this.tipoGeneralService.findAll();
  }

  @Get('categoria-servicio')
  categoriaServicio() {
    return this.tipoGeneralService.categoriaServicio();
  }

  @Get('categoria-publicacion')
  categoriaPublicacion() {
    return this.tipoGeneralService.categoriaPublicacion();
  }

  @Get('tipo-trabajo')
  tipoTrabajo() {
    return this.tipoGeneralService.tipoTrabajo();
  }

  @Get('tipo-documento')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
  tipoDocumento() {
    return this.tipoGeneralService.tipoDocumento();
  }

  @Get('tipo-cliente')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
  tipoCliente() {
    return this.tipoGeneralService.tipoCliente();
  }

  @Get(':id')
  @Auth(Rol.ADMIN)
  findOne(@Param('id') id: string) {
    return this.tipoGeneralService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para actualziar un tipo general',
    type: TipoGeneralDocumentationDto,
  })
  @Auth(Rol.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateTipoGeneralDto: UpdateTipoGeneralDto,
  ) {
    return this.tipoGeneralService.update(id, updateTipoGeneralDto);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.tipoGeneralService.remove(id);
  }
}
