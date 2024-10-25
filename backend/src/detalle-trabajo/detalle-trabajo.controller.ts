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
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@ApiTags('DetalleTrabajo')
@Auth(Rol.ADMIN, Rol.GESTOR_CLIENTES_TRABAJOS)
@Controller('detalleTrabajo')
export class DetalleTrabajoController {
  constructor(private readonly detalleTrabajoService: DetalleTrabajoService) {}

  @Post()
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
