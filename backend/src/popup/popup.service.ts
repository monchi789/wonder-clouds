import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopUp } from './entities/popup.entity';
import { CreatePopUpDto } from './dto/create-popuo.dto';
import { UpdatePopUpDto } from './dto/update-popup.dto';
import { ImageService } from '../imagenes/subir_image.service';

@Injectable()
export class PopUpService {
  constructor(
    @InjectRepository(PopUp)
    private readonly popUpRepository: Repository<PopUp>,
    private readonly imageService: ImageService,
  ) {}

  async createWithImage(
    createPopUpDto: CreatePopUpDto,
    file: Express.Multer.File,
  ) {
    const imagePath = await this.imageService.uploadImages([file], 'popup');

    const popUp = this.popUpRepository.create({
      ...createPopUpDto,
      imagenPopUp: imagePath[0],
    });

    if (createPopUpDto.estadoPopUp) {
      await this.setAllPopUpToFalse();
    }

    return await this.popUpRepository.save(popUp);
  }

  async updateWithImage(
    idPopUp: string,
    updatePopUpDto: UpdatePopUpDto,
    file?: Express.Multer.File,
  ) {
    const popUp = await this.findOne(idPopUp);

    let imagenPopUp = popUp.imagenPopUp;

    if (file) {
      await this.imageService.deleteImages([popUp.imagenPopUp]);
      const newImagePath = await this.imageService.uploadImages(
        [file],
        'popup',
      );
      imagenPopUp = newImagePath[0];
    }

    const updatedPopUp = {
      ...popUp,
      ...updatePopUpDto,
      imagenPopUp,
    };

    return await this.popUpRepository.save(updatedPopUp);
  }

  async removeWithImage(idPopUp: string) {
    const popUp = await this.findOne(idPopUp);

    await this.imageService.deleteImages([popUp.imagenPopUp]);

    await this.popUpRepository.remove(popUp);
    return { message: `PopUp con id ${idPopUp} eliminado` };
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

  async unPopUp() {
    const popUp = await this.popUpRepository.findOne({
      where: { estadoPopUp: true },
      select: ['estadoPopUp', 'imagenPopUp'],
    });

    if (!popUp) {
      throw new NotFoundException(`No hay PopUps activos`);
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
