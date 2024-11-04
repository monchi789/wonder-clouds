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
  ApiParam,
} from '@nestjs/swagger';
import { ImageService } from '../imagenes/subir_image.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@ApiTags('Slider')
@Controller('slider')
export class SliderController {
  constructor(
    private readonly sliderService: SliderService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Crear un nuevo slider' })
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
  @ApiResponse({ status: 201, description: 'Slider creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'No se han subido imágenes.' })
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

    // Subir las imágenes y obtener las rutas de las imágenes subidas
    const imagePaths = await this.imageService.uploadImages(files, 'slider');

    const sliderData = {
      ...createSliderDto,
      imagen: imagePaths, // Asigna las rutas de las imágenes al campo 'imagen'
    };

    return this.sliderService.create(sliderData);
  }

  @Get()
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Obtiene todos los sliders' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sliders obtenida exitosamente.',
  })
  findAll() {
    return this.sliderService.findAll();
  }

  @Get('lista-slider')
  async listaSlider() {
    return this.sliderService.listaSlider();
  }

  @Get(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Obtiene un slider por su ID' })
  @ApiResponse({ status: 200, description: 'Slider obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Slider no encontrado.' })
  @ApiParam({ name: 'id', description: 'ID del slider a obtener' })
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(id);
  }

  @Patch(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Actualizar un slider' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'ID del slider a actualizar' })
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
  @ApiResponse({ status: 200, description: 'Slider actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Slider no encontrado.' })
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
      await this.imageService.deleteImages(existingSlider.imagen); // Elimina las imágenes anteriores
      const newImagePaths = await this.imageService.uploadImages(
        files,
        'slider',
      );
      updatedData.imagen = newImagePaths; // Actualiza las rutas de las nuevas imágenes
    }

    return this.sliderService.update(id, updatedData);
  }

  @Delete(':id')
  @Auth(Rol.ADMIN, Rol.CREADOR_CONTENIDO)
  @ApiOperation({ summary: 'Eliminar un slider' })
  @ApiParam({ name: 'id', description: 'ID del slider a eliminar' })
  @ApiResponse({ status: 200, description: 'Slider eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Slider no encontrado.' })
  async remove(@Param('id') id: string) {
    const slider = await this.sliderService.findOne(id);
    if (!slider) {
      throw new NotFoundException(`Slider con id ${id} no encontrado`);
    }

    await this.imageService.deleteImages(slider.imagen); // Elimina las imágenes asociadas al slider
    return this.sliderService.remove(id);
  }
}
