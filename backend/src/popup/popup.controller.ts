import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { PopUpService } from './popup.service';
import { CreatePopUpDto } from './dto/create-popuo.dto';
import { UpdatePopUpDto } from './dto/update-popup.dto';
import {
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';
import { PopUpDocumentationDto } from './documentation/popupdoc.dto';

@ApiTags('PopUp')
@Controller('pop-up')
export class PopUpController {
  constructor(private readonly popUpService: PopUpService) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Crea un nuevo PopUp' })
  @ApiResponse({ status: 201, description: 'PopUp creado exitosamente.' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para crear un nuevo PopUp',
    type: PopUpDocumentationDto,
  })
  @UseInterceptors(FileInterceptor('imagen'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPopUpDto: CreatePopUpDto,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ninguna imagen.');
    }
    return this.popUpService.createWithImage(createPopUpDto, file);
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Obtiene todos los PopUps' })
  @ApiResponse({
    status: 200,
    description: 'Lista de PopUps obtenida exitosamente.',
  })
  findAll() {
    return this.popUpService.findAll();
  }

  @Get('lista-pop-up')
  @ApiOperation({ summary: 'Obtiene el PopUp activo' })
  @ApiResponse({
    status: 200,
    description: 'PopUp activo obtenido exitosamente.',
  })
  listaPopUp() {
    return this.popUpService.unPopUp();
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Obtiene un PopUp por su ID' })
  @ApiResponse({ status: 200, description: 'PopUp obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'PopUp no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.popUpService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Actualiza un PopUp' })
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({
    description: 'Estructura necesaria para actualizar un PopUp',
    type: PopUpDocumentationDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoPopUp: { type: 'boolean' },
        imagen: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('imagen'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePopUpDto: UpdatePopUpDto,
  ) {
    return this.popUpService.updateWithImage(id, updatePopUpDto, file);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Elimina un PopUp' })
  @ApiResponse({ status: 200, description: 'PopUp eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'PopUp no encontrado.' })
  async remove(@Param('id') id: string) {
    return this.popUpService.removeWithImage(id);
  }
}
