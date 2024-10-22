import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ImageService } from '../shared/image.service';

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(
    private readonly sliderService: SliderService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoSlider: { type: 'boolean' },
        imagenes: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('imagenes', 10, {
      storage: diskStorage({
        destination: './uploads/slider',
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
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createSliderDto: CreateSliderDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se han subido imágenes');
    }

    const imagePaths = await this.imageService.uploadImages(files, 'slider');

    const sliderData = {
      ...createSliderDto,
      imagen: imagePaths,
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estadoSlider: { type: 'boolean' },
        imagenes: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('imagenes', 10, {
      storage: diskStorage({
        destination: './uploads/slider',
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
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateSliderDto: Partial<UpdateSliderDto>,
  ) {
    const existingSlider = await this.sliderService.findOne(id);
    if (!existingSlider) {
      throw new NotFoundException(`Slider con id ${id} no encontrado`);
    }

    const updatedData: Partial<UpdateSliderDto & { imagen?: string[] }> = {
      ...updateSliderDto,
    };

    if (files && files.length > 0) {
      await this.imageService.deleteImages(existingSlider.imagen);
      const newImagePaths = await this.imageService.uploadImages(
        files,
        'slider',
      );
      updatedData.imagen = newImagePaths;
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

    await this.imageService.deleteImages(slider.imagen);
    return this.sliderService.remove(id);
  }
}
