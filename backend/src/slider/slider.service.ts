import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SliderService {
  constructor(
    @InjectRepository(Slider)
    private readonly sliderRepository: Repository<Slider>,
  ) {}

  async create(createSliderDto: CreateSliderDto) {
    const slider = this.sliderRepository.create(createSliderDto);
    return await this.sliderRepository.save(slider);
  }

  async findAll() {
    return await this.sliderRepository.find();
  }

  async findOne(idSlider: string) {
    try {
      const slider = await this.sliderRepository.findOne({
        where: { idSlider },
      });

      if (!slider) {
        throw new NotFoundException(
          `Slider con el id ${idSlider} no encontrado.`,
        );
      }

      return slider;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es válido');
    }
  }

  // Modificamos el tipo del argumento updateSliderDto para que acepte propiedades opcionales
  async update(idSlider: string, updateSliderDto: Partial<UpdateSliderDto & { imagen?: string }>) {
    const slider = this.sliderRepository.update(idSlider, updateSliderDto);

    if ((await slider).affected === 0) {
      throw new NotFoundException(`Slider con el id ${idSlider} no encontrado`);
    }

    return this.sliderRepository.findOne({ where: { idSlider } });
  }

  async remove(idSlider: string) {
    const slider = await this.sliderRepository.softDelete(idSlider);

    if ((await slider).affected === 0) {
      throw new NotFoundException(
        `Slider con el id ${idSlider} no encontrado.`,
      );
    }

    return { message: `Slider con el id ${idSlider} eliminado.` };
  }
}
