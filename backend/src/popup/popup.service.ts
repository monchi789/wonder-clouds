import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePopUpDto } from './dto/create-popuo.dto';
import { UpdatePopUpDto } from './dto/update-popup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PopUp } from './entities/popup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PopUpService {
  constructor(
    @InjectRepository(PopUp)
    private readonly popUpRepository: Repository<PopUp>,
  ) {}

  async create(createPopUpDto: CreatePopUpDto) {
    const slider = this.popUpRepository.create(createPopUpDto);
    return await this.popUpRepository.save(slider);
  }

  async findAll() {
    return await this.popUpRepository.find();
  }

  async findOne(idPopUp: string) {
    try {
      const popUp = await this.popUpRepository.findOne({
        where: { idPopUp },
      });

      if (!popUp) {
        throw new NotFoundException(
          `PopUp con el id ${idPopUp} no encontrado.`,
        );
      }

      return popUp;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es valido');
    }
  }

  async update(idPopUp: string, updatePopUpDto: UpdatePopUpDto) {
    const popUp = this.popUpRepository.update(idPopUp, updatePopUpDto);

    if ((await popUp).affected === 0) {
      throw new NotFoundException(`PopUp con el id ${idPopUp} no encontrado`);
    }

    return this.popUpRepository.findOne({ where: { idPopUp } });
  }

  async remove(idPopUp: string) {
    console.log(idPopUp);

    const popUp = await this.popUpRepository.softDelete(idPopUp);

    if ((await popUp).affected === 0) {
      throw new NotFoundException(`PopUp con el id ${idPopUp} no encontrada.`);
    }

    return { message: `PopUp con el id ${idPopUp} eliminada.` };
  }
}
