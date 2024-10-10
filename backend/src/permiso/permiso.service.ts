import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisoService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async create(createPermisoDto: CreatePermisoDto) {
    const permiso = this.permisoRepository.create(createPermisoDto);
    return await this.permisoRepository.save(permiso);
  }

  async findAll() {
    return await this.permisoRepository.find();
  }

  async findOne(idPermiso: number) {
    const permiso = await this.permisoRepository.findOne({
      where: { idPermiso },
    });

    if (!permiso) {
      throw new NotFoundException(
        `Permiso con el ID ${idPermiso} no encontrado`,
      );
    }

    return permiso;
  }

  async update(idPermiso: number, updatePermisoDto: UpdatePermisoDto) {
    const result = await this.permisoRepository.update(
      idPermiso,
      updatePermisoDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Permiso con el ID ${idPermiso} no encontrado`,
      );
    }

    // Retorna el permiso actualizado
    return await this.permisoRepository.findOne({ where: { idPermiso } });
  }

  async remove(idPermiso: number) {
    const result = await this.permisoRepository.softDelete(idPermiso);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Permiso con el ID ${idPermiso} no encontrado`,
      );
    }

    return { message: `Permiso con el ID ${idPermiso} eliminado` };
  }
}
