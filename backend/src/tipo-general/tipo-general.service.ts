import { Injectable } from '@nestjs/common';
import { CreateTipoGeneralDto } from './dto/create-tipo-general.dto';
import { UpdateTipoGeneralDto } from './dto/update-tipo-general.dto';

@Injectable()
export class TipoGeneralService {
  create(createTipoGeneralDto: CreateTipoGeneralDto) {
    return 'This action adds a new tipoGeneral';
  }

  findAll() {
    return `This action returns all tipoGeneral`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoGeneral`;
  }

  update(id: number, updateTipoGeneralDto: UpdateTipoGeneralDto) {
    return `This action updates a #${id} tipoGeneral`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoGeneral`;
  }
}
