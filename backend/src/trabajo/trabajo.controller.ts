import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { CreateTrabajoDto } from './dto/create-trabajo.dto';
import { UpdateTrabajoDto } from './dto/update-trabajo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Trabajo')
@Controller('trabajo')
export class TrabajoController {
  constructor(private readonly trabajoService: TrabajoService) {}

  @Post()
  create(@Body() createTrabajoDto: CreateTrabajoDto) {
    return this.trabajoService.create(createTrabajoDto);
  }

  @Get()
  findAll() {
    return this.trabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trabajoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrabajoDto: UpdateTrabajoDto) {
    return this.trabajoService.update(id, updateTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabajoService.remove(id);
  }
}
