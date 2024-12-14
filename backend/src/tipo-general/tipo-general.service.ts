import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTipoGeneralDto } from './dto/create-tipo-general.dto';
import { UpdateTipoGeneralDto } from './dto/update-tipo-general.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoGeneral } from './entities/tipo-general.entity';
import { Repository } from 'typeorm';
import { Tipo } from 'src/common/enums/tipo.enum';

@Injectable()
export class TipoGeneralService {
  constructor(
    @InjectRepository(TipoGeneral)
    private readonly tipoGeneralRepository: Repository<TipoGeneral>,
  ) {}

  async create(createTipoGeneralDto: CreateTipoGeneralDto) {
    const tipoGeneral = this.tipoGeneralRepository.create(createTipoGeneralDto);
    return await this.tipoGeneralRepository.save(tipoGeneral);
  }

  async findAll() {
    return await this.tipoGeneralRepository.find();
  }

  async findOne(idTipoGeneral: string) {
    try {
      const tipoGeneral = await this.tipoGeneralRepository.findOne({
        where: { idTipoGeneral },
      });

      if (!tipoGeneral) {
        throw new NotFoundException(
          `Tipo General con el ID ${idTipoGeneral} no encontrado`,
        );
      }

      return tipoGeneral;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('El ID proporcionado no es valido');
    }
  }

  async update(
    idTipoGeneral: string,
    updateTipoGeneralDto: UpdateTipoGeneralDto,
  ) {
    const tipoGeneral = this.tipoGeneralRepository.update(
      idTipoGeneral,
      updateTipoGeneralDto,
    );

    if ((await tipoGeneral).affected === 0) {
      throw new NotFoundException(
        `Tipo General con el ID ${idTipoGeneral} no encontrado`,
      );
    }

    return this.tipoGeneralRepository.findOne({ where: { idTipoGeneral } });
  }

  async remove(idTipoGeneral: string) {
    const tipoGeneral =
      await this.tipoGeneralRepository.softDelete(idTipoGeneral);

    if ((await tipoGeneral).affected === 0) {
      throw new NotFoundException(
        `Tipo General con el ID ${idTipoGeneral} no encontrada`,
      );
    }

    return { message: `Tipo General con el ID ${idTipoGeneral} eliminada` };
  }

  async categoriaServicio() {
    return await this.tipoGeneralRepository.find({
      where: { tipo: Tipo.CATEGORIA_SERVICIO },
    });
  }

  async categoriaPublicacion() {
    return await this.tipoGeneralRepository.find({
      where: { tipo: Tipo.CATEGORIA_PUBLICACION },
    });
  }

  async tipoTrabajo() {
    return await this.tipoGeneralRepository.find({
      where: { tipo: Tipo.TIPO_TRABAJO },
    });
  }

  async tipoDocumento() {
    return await this.tipoGeneralRepository.find({
      where: { tipo: Tipo.TIPO_DOCUMENTO },
    });
  }

  async tipoCliente() {
    return await this.tipoGeneralRepository.find({
      where: { tipo: Tipo.TIPO_CLIENTE },
    });
  }

  async categoriaProducto() {
    return await this.tipoGeneralRepository.find({
      where: { tipo: Tipo.CATEGORIA_PRODUCTO },
    });
  }
}
