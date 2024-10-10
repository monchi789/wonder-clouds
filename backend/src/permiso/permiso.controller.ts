import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permiso')
@Controller('permiso')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Post()
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisoService.create(createPermisoDto);
  }

  @Get()
  findAll() {
    return this.permisoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.permisoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisoService.update(+id, updatePermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.permisoService.remove(+id);
  }
}
