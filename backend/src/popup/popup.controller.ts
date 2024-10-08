import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PopUpService } from './popup.service';
import { CreatePopUpDto } from './dto/create-popuo.dto';
import { UpdatePopUpDto } from './dto/update-popup.dto';

@Controller('popUp')
export class PopUpController {
  constructor(private readonly popUpService: PopUpService) {}

  @Post()
  create(@Body() createPopUpDto: CreatePopUpDto) {
    return this.popUpService.create(createPopUpDto);
  }

  @Get()
  findAll() {
    return this.popUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.popUpService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePopUpDto: UpdatePopUpDto) {
    return this.popUpService.update(id, updatePopUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popUpService.remove(id);
  }
}
