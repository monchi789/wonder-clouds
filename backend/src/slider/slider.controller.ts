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
import { Express } from 'express';

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un nuevo Slider',
  })
  @ApiResponse({ status: 201, description: 'Slider creado exitosamente.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoSlider: { type: 'boolean' },
        imagen: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('imagen', {
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
    @UploadedFile() file: Express.Multer.File,
    @Body() createSliderDto: CreateSliderDto,
  ) {
    if (!file) {
      throw new BadRequestException('No se ha subido ninguna imagen');
    }

    const imagePath = `/uploads/${file.filename}`;
    console.log('Ruta de la imagen subida:', imagePath);

    const sliderData = {
      ...createSliderDto,
      imagen: imagePath, 
    };

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
      'Actualiza un Slider',
  })
  @ApiResponse({ status: 200, description: 'Slider actualizado exitosamente.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoSlider: { type: 'boolean' },
        imagen: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('imagen', {
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
    @UploadedFile() file: Express.Multer.File,
    @Body() updateSliderDto: Partial<UpdateSliderDto>, 
  ) {
    const existingSlider = await this.sliderService.findOne(id);
    if (!existingSlider) {
      throw new NotFoundException(`Slider con id ${id} no encontrado`);
    }

    let updatedData: Partial<UpdateSliderDto & { imagen?: string }> = {
      ...updateSliderDto,
    };

    
    if (!file) {
      updatedData.imagen = existingSlider.imagen;
    } else {
    
      const oldImagePath = existingSlider.imagen;
      if (oldImagePath) {
        try {
          await unlink(`.${oldImagePath}`);
        } catch (error) {
          throw new BadRequestException('Error al eliminar la imagen anterior');
        }
      }

      const newImagePath = `/uploads/${file.filename}`;
      updatedData.imagen = newImagePath;  
    }

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
        throw new BadRequestException('Error al eliminar la imagen');
      }
    }

    await this.sliderService.remove(id);
    return { message: `Slider con id ${id} eliminado` };
  }
}
