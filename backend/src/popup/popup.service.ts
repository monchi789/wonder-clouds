import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopUp } from './entities/popup.entity';
import { CreatePopUpDto } from './dto/create-popuo.dto';
import { UpdatePopUpDto } from './dto/update-popup.dto';

@Injectable()
export class PopUpService {
  constructor(
    @InjectRepository(PopUp)
    private readonly popUpRepository: Repository<PopUp>,
  ) {}

  async create(createPopUpDto: CreatePopUpDto) {
    const popUp = this.popUpRepository.create(createPopUpDto);

    if (createPopUpDto.estadoPopUp) {
      await this.setAllPopUpToFalse();
    }

    return await this.popUpRepository.save(popUp);
  }

  async findAll() {
    return await this.popUpRepository.find();
  }

  async findOne(idPopUp: string): Promise<PopUp> {
    const popUp = await this.popUpRepository.findOne({ where: { idPopUp } });
    if (!popUp) {
      throw new NotFoundException(`PopUp con id ${idPopUp} no encontrado`);
    }
    return popUp;
  }

  async update(
    idPopUp: string,
    updatePopUpDto: Partial<UpdatePopUpDto & { imagenPopUp?: string }>,
  ) {
    const popUp = await this.popUpRepository.preload({
      idPopUp,
      ...updatePopUpDto,
    });

    if (!popUp) {
      throw new NotFoundException(`PopUp con id ${idPopUp} no encontrado`);
    }

    return await this.popUpRepository.save(popUp);
  }

  async remove(idPopUp: string) {
    const popUp = await this.popUpRepository.findOne({ where: { idPopUp } });
    if (!popUp) {
      throw new NotFoundException(`PopUp con id ${idPopUp} no encontrado`);
    }
    await this.popUpRepository.remove(popUp);
    return { message: `PopUp con id ${idPopUp} eliminado` };
  }

  async unPopUp() {
    const popUp = await this.popUpRepository.findOne({
      where: { estadoPopUp: true },
      select: ['estadoPopUp', 'imagenPopUp'],
    });

    if (!popUp) {
      throw new NotFoundException(`No hay PopUps para listar`);
    }

    return popUp;
  }

  private async setAllPopUpToFalse(excludeId?: string) {
    await this.popUpRepository
      .createQueryBuilder()
      .update(PopUp)
      .set({ estadoPopUp: false })
      .where('idPopUp != :excludeId', { excludeId: excludeId || '' })
      .execute();
  }
}
