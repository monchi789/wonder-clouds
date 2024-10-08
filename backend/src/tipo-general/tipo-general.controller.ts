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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipo General')
@Controller('tipo-general')
export class TipoGeneralController {
  constructor(private readonly tipoGeneralService: TipoGeneralService) {}

  @Post()
  create(@Body() createTipoGeneralDto: CreateTipoGeneralDto) {
    return this.tipoGeneralService.create(createTipoGeneralDto);
  }

  @Get()
  findAll() {
    return this.tipoGeneralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoGeneralService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoGeneralDto: UpdateTipoGeneralDto,
  ) {
    return this.tipoGeneralService.update(id, updateTipoGeneralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoGeneralService.remove(id);
  }
}
