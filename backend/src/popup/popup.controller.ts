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
import { unlink } from 'fs/promises';

@ApiTags('PopUp')
@Controller('popUp')
export class PopUpController {
  constructor(private readonly popUpService: PopUpService) {}

  @Post()
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
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
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
    @UploadedFile() file: any,
    @Body() createPopUpDto: CreatePopUpDto,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ninguna imagen');
    }

    const imagePath = `/uploads/${file.filename}`;
    const popUpData = {
      ...createPopUpDto,
      imagenPopUp: imagePath,
    };

    return this.popUpService.create(popUpData);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los PopUps' })
  @ApiResponse({
    status: 200,
    description: 'Lista de PopUps obtenida exitosamente.',
  })
  findAll() {
    return this.popUpService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un PopUp por su ID' })
  @ApiResponse({ status: 200, description: 'PopUp obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'PopUp no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.popUpService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza un PopUp',
  })
  @ApiResponse({ status: 200, description: 'PopUp actualizado exitosamente.' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
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
    @UploadedFile() file: any,
    @Body() updatePopUpDto: UpdatePopUpDto,
  ) {
    const existingPopUp = await this.popUpService.findOne(id);
    if (!existingPopUp) {
      throw new NotFoundException(`PopUp con id ${id} no encontrado`);
    }

    let updatedData = { ...updatePopUpDto };

    if (file) {
      const oldImagePath = existingPopUp.imagenPopUp;
      if (oldImagePath) {
        try {
          await unlink(`.${oldImagePath}`);
        } catch {
          throw new BadRequestException('Error al eliminar la imagen anterior');
        }
      }

      const newImagePath = `/uploads/${file.filename}`;
      updatedData = {
        ...updatedData,
        imagenPopUp: newImagePath,
      };
    }

    return this.popUpService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un PopUp por su ID' })
  @ApiResponse({ status: 200, description: 'PopUp eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'PopUp no encontrado.' })
  async remove(@Param('id') id: string) {
    const popUp = await this.popUpService.findOne(id);
    if (!popUp) {
      throw new NotFoundException(`PopUp con id ${id} no encontrado`);
    }

    const imagePath = popUp.imagenPopUp;
    if (imagePath) {
      try {
        await unlink(`.${imagePath}`);
      } catch {
        throw new BadRequestException('Error al eliminar la imagen');
      }
    }

    await this.popUpService.remove(id);
    return { message: `PopUp con id ${id} eliminado` };
  }
}
