import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetalleTrabajoService } from './detalle-trabajo.service';
import { CreateDetalleTrabajoDto } from './dto/create-detalle-trabajo.dto';
import { UpdateDetalleTrabajoDto } from './dto/update-detalle-trabajo.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { DetalleTrabajoDocumentationDto } from './documentation/detalle-trabajo-doc.dto';

@ApiTags('Detalle Trabajo')
@Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
@Controller('detalle-trabajo')
export class DetalleTrabajoController {
  constructor(private readonly detalleTrabajoService: DetalleTrabajoService) {}

  @Post()
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para crear un nuevo detalle de trabajo',
    type: DetalleTrabajoDocumentationDto,
  })
  create(@Body() createDetalleTrabajoDto: CreateDetalleTrabajoDto) {
    return this.detalleTrabajoService.create(createDetalleTrabajoDto);
  }

  @Get()
  findAll() {
    return this.detalleTrabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleTrabajoService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para actualizar un detalle de trabajo',
    type: DetalleTrabajoDocumentationDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDetalleTrabajoDto: UpdateDetalleTrabajoDto,
  ) {
    return this.detalleTrabajoService.update(id, updateDetalleTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleTrabajoService.remove(id);
  }
}
