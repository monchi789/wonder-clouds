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
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
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

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un nuevo Slider con la posibilidad de subir una imagen',
  })
  @ApiResponse({ status: 201, description: 'Slider creado exitosamente.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoSlider: { type: 'boolean' },
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
    @Body() createSliderDto: CreateSliderDto,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ninguna imagen');
    }

    const imagePath = `/uploads/${file.filename}`;
    console.log('Ruta de la imagen subida:', imagePath); // Log para verificar

    const sliderData = {
      ...createSliderDto,
      imagen: imagePath, // Asignar la ruta de la imagen correctamente
    };

    console.log('Datos del Slider a guardar:', sliderData); // Verificar los datos antes de guardarlos

    return this.sliderService.create(sliderData);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los Sliders' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Sliders obtenida exitosamente.',
  })
  findAll() {
    return this.sliderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un Slider por su ID' })
  @ApiResponse({ status: 200, description: 'Slider obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Slider no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Actualiza un Slider, incluida la posibilidad de reemplazar la imagen',
  })
  @ApiResponse({ status: 200, description: 'Slider actualizado exitosamente.' })
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
    @Body() updateSliderDto: UpdateSliderDto,
  ) {
    const existingSlider = await this.sliderService.findOne(id);
    if (!existingSlider) {
      throw new NotFoundException(`Slider con id ${id} no encontrado`);
    }

    let updatedData = { ...updateSliderDto };

    if (file) {
      const oldImagePath = existingSlider.imagen;
      if (oldImagePath) {
        try {
          await unlink(`.${oldImagePath}`);
        } catch (error) {
          console.error('Error al eliminar la imagen anterior:', error); // Agregar log para el error
          throw new BadRequestException('Error al eliminar la imagen anterior');
        }
      }

      const newImagePath = `/uploads/${file.filename}`;
      console.log('Nueva ruta de la imagen subida:', newImagePath); // Log para verificar

      updatedData = {
        ...updatedData,
        imagen: newImagePath,
      };
    }

    console.log('Datos del Slider a actualizar:', updatedData); // Verificar los datos antes de actualizarlos

    return this.sliderService.update(id, updatedData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un Slider por su ID' })
  @ApiResponse({ status: 200, description: 'Slider eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Slider no encontrado.' })
  async remove(@Param('id') id: string) {
    const slider = await this.sliderService.findOne(id);
    if (!slider) {
      throw new NotFoundException(`Slider con id ${id} no encontrado`);
    }

    const imagePath = slider.imagen;
    if (imagePath) {
      try {
        await unlink(`.${imagePath}`);
      } catch (error) {
        console.error('Error al eliminar la imagen:', error); // Agregar log para el error
        throw new BadRequestException('Error al eliminar la imagen');
      }
    }

    await this.sliderService.remove(id);
    return { message: `Slider con id ${id} eliminado` };
  }
}
