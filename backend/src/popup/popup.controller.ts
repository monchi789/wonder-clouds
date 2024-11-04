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
  BadRequestException,
  NotFoundException,
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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from '../imagenes/subir_image.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@ApiTags('PopUp')
@Controller('pop-up')
export class PopUpController {
  constructor(
    private readonly popUpService: PopUpService,
    private readonly imageService: ImageService, // Inyecta el servicio de imágenes
  ) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({
    summary: 'Crea un nuevo PopUp',
  })
  @ApiResponse({ status: 201, description: 'PopUp creado exitosamente.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoPopUp: { type: 'boolean' },
        imagen: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/popup',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPopUpDto: CreatePopUpDto,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ninguna imagen');
    }

    // Usa el servicio de imágenes para subir la imagen
    const imagePath = await this.imageService.uploadImages([file], 'popup');

    const popUpData = {
      ...createPopUpDto,
      imagenPopUp: imagePath[0], // Solo se usa la primera imagen subida
    };

    return this.popUpService.create(popUpData);
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
  @ApiOperation({
    summary:
      'Actualiza un PopUp, incluida la posibilidad de cambiar el estado y la imagen',
  })
  @ApiResponse({ status: 200, description: 'PopUp actualizado exitosamente.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoPopUp: { type: 'boolean' },
        imagen: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/popup',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePopUpDto: Partial<UpdatePopUpDto>,
  ) {
    const existingPopUp = await this.popUpService.findOne(id);
    if (!existingPopUp) {
      throw new NotFoundException(`PopUp con id ${id} no encontrado`);
    }

    const updatedData: Partial<UpdatePopUpDto & { imagenPopUp?: string }> = {
      ...updatePopUpDto,
    };

    if (file) {
      await this.imageService.deleteImages([existingPopUp.imagenPopUp]);

      const newImagePaths = await this.imageService.uploadImages(
        [file],
        'popup',
      );
      updatedData.imagenPopUp = newImagePaths[0];
    }

    return this.popUpService.update(id, updatedData);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Elimina un PopUp por su ID' })
  @ApiResponse({ status: 200, description: 'PopUp eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'PopUp no encontrado.' })
  async remove(@Param('id') id: string) {
    const popUp = await this.popUpService.findOne(id);
    if (!popUp) {
      throw new NotFoundException(`PopUp con id ${id} no encontrado`);
    }

    await this.imageService.deleteImages([popUp.imagenPopUp]);

    return this.popUpService.remove(id);
  }
}
