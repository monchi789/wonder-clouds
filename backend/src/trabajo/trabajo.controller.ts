import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { FiltroTrabajoDto } from './dto/trabajo.filtro.dto';

@ApiTags('Trabajo')
@Controller('trabajo')
export class TrabajoController {
  constructor(private readonly trabajoService: TrabajoService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Crear un nuevo trabajo' })
  @ApiResponse({ status: 201, description: 'Trabajo creado exitosamente.' })
  async create(@Body() createTrabajoDto: CreateTrabajoDto) {
    return this.trabajoService.create(createTrabajoDto);
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Obtiene todos los trabajos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de trabajos obtenida exitosamente.',
  })
  findAll(@Query() filtros: FiltroTrabajoDto) {
    return this.trabajoService.findAll(filtros);
  }

  @Get('lista-trabajo')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  listaTrabajo(@Query() filtros: FiltroTrabajoDto) {
    return this.trabajoService.listaTrabajo(filtros);
  }

  @Get('lista-trabajo/:id')
  unTrabajo(@Param('id') id: string) {
    return this.trabajoService.unTrabajo(id);
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
  @ApiOperation({ summary: 'Obtiene un trabajo por su ID' })
  @ApiResponse({ status: 200, description: 'Trabajo obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Trabajo no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.trabajoService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Actualizar un trabajo' })
  @ApiResponse({
    status: 200,
    description: 'Trabajo actualizado exitosamente.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTrabajoDto: UpdateTrabajoDto,
  ) {
    return this.trabajoService.update(id, updateTrabajoDto);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
  @ApiOperation({ summary: 'Elimina un trabajo por su ID' })
  @ApiResponse({ status: 200, description: 'Trabajo eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Trabajo no encontrado.' })
  async remove(@Param('id') id: string) {
    return this.trabajoService.remove(id);
  }
}
